import { AltUri, Interest, Name } from "@ndn/packet";
import { WsTransport } from "@ndn/ws-transport";
import { Endpoint } from "@ndn/endpoint";

document.getElementById('data_pasien_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const nama = document.getElementById('nama').value;
    const umur = document.getElementById('umur').value;
    const sex = document.getElementById('jenis_kelamin').value;
    const penyakit = document.getElementById('penyakit').value;

    // Create a JSON object from the input values
    const dataJson = {
        nama: nama,
        umur: umur,
        sex: sex,
        penyakit: penyakit
    };

    const jsonData = JSON.stringify(dataJson);

    async function ping(evt) { //membuat fungsi async
        evt.preventDefault();
        const prefix = "/data/inputdata"; //membuat const baru dari id #app_prefix dari form
        const app = jsonData; //membuat const baru dari id #app_param dari form
        //const $log = document.querySelector("#app_log"); //membuat const baru dari id #app_log dari form
        
        const endpoint = new Endpoint();
        const encoder = new TextEncoder(); //membuat const baru untuk fungsi TextEncoder
        const interest = new Interest(); //membuat const baru untuk fungsi Interest

        interest.name = prefix; //membuat const baru untuk dari fungsi interest dan name
        interest.mustBeFresh = true; 
        interest.lifetime = 1000;
        interest.appParameters = encoder.encode(app); //melakukan encode packet ndn
        await interest.updateParamsDigest();    


        const t0 = Date.now();
        const data = await endpoint.consume(interest);
        const rtt = Date.now() - t0;
        const dataContent = data.content;

        $log.textContent += `content= ${String.fromCharCode(...dataContent)}\n`; //print data respon
        console.log(interest.appParameters)
        console.log(`${rtt} ms`);
    }
});

async function main() {
    const face = await WsTransport.createFace({}, "wss://hmbe.ndntel-u.my.id:9696");
    face.addRoute(new Name("/"));
    document.querySelector("#app_form").addEventListener("submit", ping);
  }
  window.addEventListener("load", main);
