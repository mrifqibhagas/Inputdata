//import { connectToNetwork, connectToRouter } from "@ndn/autoconfig";
import { Endpoint } from "@ndn/endpoint";
import { AltUri, Interest, Name } from "@ndn/packet";
import { WsTransport } from "@ndn/ws-transport";
//import { delay } from "@ndn/util";   

 // Fungsi untuk menyimpan data ke Firestore
 try{ 
    function simpanData(evt) {
         const nama = document.getElementById('nama').value;
         const umur = document.getElementById('umur').value;
         const sex = document.querySelector('input[name="sex"]:checked').value;
         const prefix = new Name(document.querySelector('prefix').value);
         const penyakit = document.getElementById('penyakit').value;
        // $log.textContent = `Check Data \n${AltUri.ofName(prefix)}\n`;

        const dataJson = {
            nama: nama,
            umur: umur,
            sex: sex,
            // interest: interest,
            penyakit: penyakit
        };
         const jsonData = JSON.stringify(dataJson);
         const endpoint = new Endpoint();
         const encoder = new TextEncoder();
         const app = jsonData;}

         for (let i = 0; i < 1; ++i) {
            const interest = new Interest();
            interest.name = prefix;
            interest.mustBeFresh = true; 
            interest.lifetime = 10000;
            interest.appParameters = encoder.encode(app);
            //$log.textContent += `\n${encoder.encode(app)}\n`;
            const t0 = Date.now();
            await interest.updateParamsDigest();
            try {
                // Retrieve Data and compute round-trip time.
                const data = await endpoint.consume(interest);
                const rtt = Date.now() - t0;
                const dataContent = data.content;}
            finally {
                console.log("Berhasil mengirim");}
        }
    }
finally {
    console.log("Berhasil menambah data");
}
async function main() {
    const face = await WsTransport.createFace({}, "wss://scbe.ndntel-u.my.id:9696");
    face.addRoute(new Name("/"));}
    window.addEventListener("load", main);