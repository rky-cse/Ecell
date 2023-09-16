const gridItems = document.querySelectorAll('.grid-item');


for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener('click', () => {
        // Toggle the "red" class on the clicked grid item
        gridItems[i].classList.toggle('red');
    });
}
const lastBox = gridItems[gridItems.length - 1]; // Get the last grid item
const clickQueue = []; // Array to store click sequence
let isRestoringColors = false; // Flag to track color restoration process

gridItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item !== lastBox) {
            // Change the clicked item's color to red and store in the queue
            item.classList.add('red');
            clickQueue.push(item);
        } else if (!isRestoringColors) {
            // Start restoring colors with a 1-second delay
            isRestoringColors = true;
            lastBox.classList.add('red'); // Make the last box red when clicked
            restoreColors();
        }
    });
});

function restoreColors() {
    if (clickQueue.length === 0) {
        // All colors have been restored
        lastBox.classList.remove('red');
        lastBox.classList.add('blue'); // Change the last box to blue
        isRestoringColors = false;
        return;
    }

    const itemToRestore = clickQueue.shift(); // Get the next item to restore

    // Change the color of the item back to blue with a 1-second delay
    itemToRestore.classList.remove('red');
    itemToRestore.classList.add('blue');

    // Continue the color restoration process recursively
    setTimeout(restoreColors, 1000); // Wait 1 second before restoring the next item
}