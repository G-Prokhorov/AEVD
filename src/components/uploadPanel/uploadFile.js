export default function uploadF(setBlock, showErr, setFiles) {
    let uploadFiles = (event) => {
        setBlock(true);
        let files = Array.from(event.target.files);

        if (files.length < 1) {
            showErr();
            return;
        }

        let promises = [];

        let result = 0;

        for (let file of files) {
            promises.push(new Promise(function (resolve, reject) {
                if (file.type.split("/")[0] === "video") {
                    let media = new Audio(URL.createObjectURL(file));
                    media.onloadedmetadata = function () {
                        resolve(media.duration);
                    }

                } else {
                    showErr();
                    reject();
                }
            }));
        }

        Promise.all(promises).then((vals) => {
            for (let time of vals) {
                result += time;
            }
        }).then(() => {
            if (result > 3) {
                setFiles(files);
                setBlock(false);
            } else {
                showErr();
            }
        })
    }

    return uploadFiles;
}