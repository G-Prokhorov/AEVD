export default function uploadF(setBlock, showErr, setFiles) {
    let uploadFiles = (event) => {
        let files = Array.from(event.target.files);

        if (files.length < 5) {
            showErr();
            return;
        }

        let promises = [];

        let result = {
            notVideo: false,
            length: 0,
        }

        for (let file of files) {
            promises.push(new Promise(function (resolve, reject) {
                if (file.type.split("/")[0] === "video") {
                    let media = new Audio(URL.createObjectURL(file));
                    media.onloadedmetadata = function () {
                        resolve(media.duration);
                    }

                } else {
                    result.notVideo = true;
                    reject();
                }
            }));
        }

        Promise.all(promises).then((vals) => {
            for (let time of vals) {
                result.length += time;
            }
        }).then(() => {
            if (!result.notVideo && result.length > 20) {
                setFiles(files);
                setBlock(false);
            } else {
                showErr();
            }
        })
    }

    return uploadFiles;
}