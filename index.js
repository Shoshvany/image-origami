<html>
    <head>
        <style>
            @media print {
                body * {
                    visibility: hidden;
                }
                #app, #app * {
                    visibility: visible;
                }
                #app {
                    position: fixed;
                    width: 100vw;
                    height: 100vw;
                    overflow: hidden;

                }
            }
            #form1, #form2 {
                position: relative;
            }
            #container {
                position: relative;
                width: 297px;
                height: 420px;
            }
            #app {
                position: absolute;
                width: 100vw;
                height: 100vh;
            }
            #ph {
                display:flex;
                position: absolute;
                top:33vh;
                left: 24vw;
                right:24vw;
                bottom:34vh;
                align-self: center;
            }

            #ph img {
                flex-shrink: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            #leftDiag {
                position: absolute;
                left: 0;
                top:65vh;
                bottom:0;
                right:50vw;
                border-top: black 1px dotted;
                transform: skewY(45deg);
                transform-origin: bottom left;
            }

            #rightDiag {
                position: absolute;
                left: 50vw;
                top:65vh;
                bottom:0;
                right:0;
                border-top: black 1px dotted;
                transform: skewY(-45deg);
                transform-origin: bottom right;
            }

            #leftLine {
                position: absolute;
                left: 25vw;
                top:0;
                bottom:0;
                width:0;
                border-right: black 1px dotted;
            }

            #topLine {
                position: absolute;
                left: 0;
                right: 0;
                top:34vh;
                height:0;
                border-top: black 1px dotted;
            }

            #bottomLine {
                position: absolute;
                left: 0;
                right: 0;
                bottom:35vh;
                height:0;
                border-top: black 1px dotted;
            }

            #rightLine {
                position: absolute;
                right: 25vw;
                top:0;
                bottom:0;
                width:0;
                border-left:  black 1px dotted;
            }

        </style>
    </head>

    <body>
        <div id="container">
            <div id="app">
                <div id="leftLine"></div>
                <div id="rightLine"></div>
                <div id="topLine"></div>
                <div id="bottomLine"></div>
                <div id="leftDiag"></div>
                <div id="rightDiag"></div>
                <div id="ph"></div>
            </div>
        </div>
        <div id="form1">
             <form id="upload">
                <label for="file">File to upload</label>
                <input type="file" id="file" accept="image/*">

                <button>Upload</button>
            </form>
        </div>
        <div id="form2">
            Zoom: <input type="text" id="zoom" value="100">
        </div>
        <script type="application/javascript">
            // Get the form and file field
            let form = document.querySelector('#upload');
            let file = document.querySelector('#file');
            let ph = document.querySelector('#ph');
            let zoom = document.querySelector('#zoom');
            let img = document.createElement('img');
            ph.append(img);

            function onImageLoad (event) {
                img.src =  event.target.result;
                handleZoomChange()
            }

            function handleSubmit (event) {
                event.preventDefault();
                if (!file.value.length) return;
                let reader = new FileReader();
                reader.onload = onImageLoad;
                reader.readAsDataURL(file.files[0]);
            }

            let zoomValue = 100
            function handleZoomChange () {
                try{
                   let newZoomValue = parseFloat(zoom.value)
                    if (Number.isNaN(newZoomValue)) {
                        throw (new Error('newZoomValue NAN'))
                    }
                    let scale = zoomValue / 100
                    ph.style.transform = 'scale(' +scale + ')'
                    zoomValue = newZoomValue
                }
                catch (e) {
                    zoom.value = zoomValue;
                }
            }
            form.addEventListener('submit', handleSubmit);
            zoom.addEventListener('change', handleZoomChange);
        </script>
    </body>
</html>
