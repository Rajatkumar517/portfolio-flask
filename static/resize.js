let Inputfile = document.getElementById("file");
let Showname = document.getElementById("img_name");

let heg = document.getElementById("number1");
let wid = document.getElementById("number2");

let formatSelect = document.getElementById("format");
let para = document.getElementById("para");

let show = document.getElementById("show");

let Download = document.getElementById("download");



Inputfile.addEventListener("change", () => {
    if(Inputfile.files.length > 0){
        Showname.innerText = Inputfile.files[0].name;
    }else{
        Showname.innerText = "Click to Image Select";
    }
})

show.addEventListener("click", () => {
    let image = Inputfile.files[0];

    if(!image){
        alert("Please Select the Image");
        return false;
    }

    if(!heg.value || !wid.value){
        alert("Please Enter the Height & Width")
        return false;
    }

    if(image){
        let img = new Image();
        img.src = URL.createObjectURL(image)
        
    
        img.onload = function(){
            let canvas = document.createElement("canvas")
            canvas.width = Number(wid.value)
            canvas.height = Number(heg.value)

            let ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality= "high";

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            let format = formatSelect.value;
            let Type;

            if(format == "png"){
                Type = "image/png";
            }
            else if(format =="jpeg"){
                Type = "image/jpeg";
            }
            else if(format == "webp"){
                Type = "image/webp";
            }
            else{
                Type = "image/jpeg"
            }

            canvas.toBlob(function(blob){
                let sizeKb = (blob.size / 1024).toFixed(2)
                para.innerHTML = "";
                para.appendChild(canvas);

                let info = document.createElement("p");
                info.innerText = "image size :  " + sizeKb + "KB";

                para.appendChild(info);
            }, Type, 1.0)
    }

    }
    
})

Download.addEventListener("click", () => {
    let img_file = Inputfile.files[0];
    
    if(!img_file){
        alert("Please select the Image")
        return
    }

    if(!wid.value || !heg.value){
        alert("Please entered Height & Width")
        return
    }

    let newWidth = Number(wid.value);
    let newHeight = Number(heg.value);

    let create_img = new Image();
    create_img.src=URL.createObjectURL(img_file);

    create_img.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high"

        ctx.drawImage(create_img, 0, 0, canvas.width, canvas.height)

        let format = formatSelect.value;
        let mime;

        if(format == "png"){
            mime = "image/png";
        }
        else if(format == "jpeg"){
            mime = "image/jpeg";
        }
        else if(format == "webp"){
            mime = "image/webp"
        }
        else {
            mime = "image/jpeg"
        }

        let link = document.createElement("a");
        link.download = "image." + format;

        if(format == "png"){
            link.href = canvas.toDataURL(mime)
        }
        else if(format == "jpeg"){
            link.href = canvas.toDataURL(mime, 1.0)
        }
        else if(format == "webp"){
            link.href = canvas.toDataURL(mime, 1.0)
        }
        else{
            link.href = canvas.toDataURL(mime, 1.0)
        }

        link.click();
    }
    
})