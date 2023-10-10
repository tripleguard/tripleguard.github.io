const galleryContainer = document.querySelector('.gallery');

fetch('https://api.github.com/repos/tripleguard/tripleguard.github.io/contents/works')
    .then(response => response.json())
    .then(data => {
        let rowElement = document.createElement('div');
        rowElement.className = 'row';

        data.forEach(file => {
            if (file.type === 'file' && file.name.endsWith('.jpg')) {
                const imageURL = file.download_url;
                const altText = file.name;
                const imgElement = document.createElement('img');
                imgElement.src = imageURL;
                imgElement.alt = altText;
                imgElement.loading = 'lazy';
                imgElement.onclick = function () {
                    openImage(this);
                };

                const cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.appendChild(imgElement);

                rowElement.appendChild(cellElement);

                // Если в ряду уже две картинки, создаем новый ряд
                if (rowElement.childNodes.length === 2) {
                    galleryContainer.appendChild(rowElement);
                    rowElement = document.createElement('div');
                    rowElement.className = 'row';
                }
            }
        });

        // Если последний ряд содержит только одну картинку, добавляем его в галерею
        if (rowElement.childNodes.length > 0) {
            galleryContainer.appendChild(rowElement);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
