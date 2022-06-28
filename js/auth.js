

            //getting the  valule from the storage 
             var nameFromStorage = localStorage.getItem("storedName");
            //checking the value is not empty
            if(nameFromStorage!=undefined&&nameFromStorage!=null&&nameFromStorage.trim().length!=0&& typeof nameFromStorage == "string"){
                document.getElementById("identifiant").value=nameFromStorage;
            }
            //storing the value in the storage
            function storeName(){
            var nameInputVal = document.getElementById("identifiant").value;
            localStorage.setItem("storedName",nameInputVal);
            }

            let p;

            //var myid = document.getElementById('identifiant').value;
            //var myid ="47f71df42647ed006888456a64e6e69d3b348b6f53ecc19bcea9d633b5696a87";
            
            document.addEventListener('DOMContentLoaded', 
                function(){
                    p = document.querySelector('button');
                    p.addEventListener('click', doFetch);
                });
            
            function doFetch(ev){
                let uri = 'https://trankillprojets.fr/wal/wal.php?relations&identifiant='+ document.getElementById("identifiant").value;
                
                let h = new Headers();
                h.append('Accept', 'application/json');
                let encoded = window.btoa('rex:pass123');
                let auth = 'Basic ' + encoded;
                h.append('Authorization', auth );
                console.log( auth );
                
                let req = new Request(uri, {
                    method: 'GET',
                    headers: h,
                    credentials: 'include'
                });
                //credentials: 'same-origin'
                
                fetch(req)
                .then( (response)=>{
                    if(response.ok){
                        return response.json();
                    }else{
                        throw new Error('BAD HTTP stuff');
                    }
                })
                .then( (jsonData) =>{
                    console.log(jsonData);
                    p.textContent = JSON.stringify(jsonData, null, 4);
                })
                .catch( (err) =>{
                    console.log('ERROR:', err.message);
                });
            }
            
            /********************************
            Server can send headers
            WWW-Authenticate: Basic realm="Realm Description" charset="UTF-8"
            HTTP/1.1: 401 Unauthorized
            HTTP/1.1: 403 Forbidden
            
            Client sends header
            Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
            The string is username:password base-64 encoded
            MUST BE OVER HTTPS
            ********************************/
        
 