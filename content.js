// Function to change the gradient color
function changeGradientColor(color1, color2) {
    const element = document.getElementById('root-page-mobile');
    if (element) {
        // Change the background to a new gradient color
        element.style.backgroundImage = `linear-gradient(135deg, ${color1}, ${color2})`;
    }
}

// Function to create and append a new icon to the ordered list in nav-bar
function addIconToNavMenu() {
const navBar = document.getElementById('nav-bar');
if (navBar) {
    // Find the nested element with class '_1u05O'
    const orderedList = navBar.querySelectorAll('._1u05O')[1];
    const orderedList1 = navBar.querySelectorAll('._1u05O')[0];
        if (orderedList) {
            // Create a new list item
            const newItem = document.createElement('li');
newItem.className = '_3RptD';
            // Create the link element
            const newLink = document.createElement('a');
	    newLink.className = 'MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary';
            newLink.href = ''; // Set the href attribute as needed

            // Create the icon element
            const img = document.createElement('img');
            img.src = 'https://i.ibb.co/tmRDY8L/settings-gear.png';
img.draggable = false;
            img.width = 20;
            
            const spn = document.createElement('span');
            spn.textContent = 'Background';
            spn.className = '_21Sfe';

            // Append the icon to the link
            newLink.appendChild(img);
            newLink.appendChild(spn);

            // Add click event to the link
            newLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default anchor behavior
                createAndShowDialog(); // Call the function to create and show the new div
            });

            // Append the link to the new list item
            newItem.appendChild(newLink);
            
            // Append the new list item to the ordered list
            orderedList.appendChild(newItem);
        }
        if (orderedList1) {
            // Create a new list item
            const newItem = document.createElement('li');
newItem.className = '_3RptD';
            // Create the link element
            const newLink = document.createElement('a');
	    newLink.className = 'MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary';
            newLink.href = ''; // Set the href attribute as needed

            // Create the icon element
            const img = document.createElement('img');
            img.src = 'https://i.ibb.co/tmRDY8L/settings-gear.png';
img.draggable = false;
            img.width = 20;
            
            const spn = document.createElement('span');
            spn.textContent = 'Background';
            spn.className = '_21Sfe';

            // Append the icon to the link
            newLink.appendChild(img);
            newLink.appendChild(spn);

            // Add click event to the link
            newLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default anchor behavior
                createAndShowDialog(); // Call the function to create and show the new div
            });

            // Append the link to the new list item
            newItem.appendChild(newLink);
            
            // Append the new list item to the ordered list
            orderedList1.appendChild(newItem);
        }

    }
}
// Function to create and show a new div with fade-in effect
function createAndShowDialog() {
    const dialogRoot = document.createElement('div');
    dialogRoot.role = 'presentation';
    dialogRoot.className = 'MuiDialog-root';
    dialogRoot.style.position = 'fixed';
    dialogRoot.style.zIndex = '1300';
    dialogRoot.style.inset = '0px';

    const backdrop = document.createElement('div');
    backdrop.className = 'MuiBackdrop-root';
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.style.opacity = '0'; // Start with 0 opacity
    backdrop.style.transition = 'opacity 100ms'; // Smooth transition for opacity

    const dialogContainer = document.createElement('div');
    dialogContainer.className = 'MuiDialog-container MuiDialog-scrollPaper';
    dialogContainer.setAttribute('role', 'none presentation');
    dialogContainer.setAttribute('tabindex', '-1');
    dialogContainer.style.opacity = '0'; // Start with 0 opacity
    dialogContainer.style.transition = 'opacity 100ms'; // Smooth transition for opacity
    dialogContainer.style.backgroundColor = '#00000080';

    const dialogPaper = document.createElement('div');
    dialogPaper.className = 'MuiPaper-root MuiDialog-paper _3mjkA MuiDialog-paperScrollPaper MuiDialog-paperWidthMd MuiPaper-rounded';
    dialogPaper.setAttribute('role', 'dialog');
    dialogPaper.style.backgroundColor = '#283540';

    const closeButton = document.createElement('button');
    closeButton.className = 'MuiButtonBase-root MuiIconButton-root _2R2aV';
    closeButton.setAttribute('tabindex', '0');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('aria-label', 'close');

    const closeIcon = document.createElement('span');
    closeIcon.className = 'MuiIconButton-label';
    closeIcon.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
    </svg>`;
    closeButton.appendChild(closeIcon);

    const fadeOut = () => {
        let fadeOutOpacity = 1; // Start with 1 opacity
        const fadeOutInterval = setInterval(() => {
            fadeOutOpacity -= 0.05; // Change this step for faster/slower fade
            if (fadeOutOpacity <= 0) {
                fadeOutOpacity = 0; // Ensure it doesn't go under 0
                backdrop.style.opacity = fadeOutOpacity;
                dialogContainer.style.opacity = fadeOutOpacity;
                clearInterval(fadeOutInterval);
                dialogRoot.remove(); // Remove the dialog after fading out
            } else {
                backdrop.style.opacity = fadeOutOpacity;
                dialogContainer.style.opacity = fadeOutOpacity;
            }
        }, 16); // approximately 60fps
    };

    closeButton.addEventListener('click', () => {
        fadeOut();
    });

    backdrop.addEventListener('click', fadeOut);
    dialogContainer.addEventListener('click', (event) => {
        if (event.target === dialogContainer) {
            fadeOut();
        }
    });

    const dialogContent = document.createElement('div');
    dialogContent.className = 'MuiDialogContent-root _1VZXk';

    const contentBox = document.createElement('div');
    contentBox.className = 'MuiBox-root jss1';
    const title = document.createElement('h3');
    title.textContent = 'Change Background';

    const description1 = document.createElement('p');
    description1.textContent = 'Change the KoGaMa background color to any color you like!';

    const description2Container = document.createElement('div');
    description2Container.style.display = 'flex';
    description2Container.style.alignItems = 'center';
    description2Container.style.marginBottom = '10px';

    const description2 = document.createElement('p');
    description2.textContent = 'Color1:';
    description2.style.marginRight = '10px';
    description2.style.fontWeight = 'bold'; // Make the text bold

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.style.width = '500px'; // Set a fixed width
    colorInput.style.height = '40px'; // Set a fixed height
    colorInput.style.border = 'none'; // Remove default border
    colorInput.style.borderRadius = '4px'; // Slightly rounded corners
    colorInput.style.cursor = 'pointer'; // Change cursor to pointer
    colorInput.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)'; // Add shadow for depth
    colorInput.style.transition = 'box-shadow 0.3s'; // Smooth transition for hover effect
    colorInput.style.backgroundColor = 'transparent'; // Ensure background is transparent
    colorInput.style.outline = 'none'; // Remove outline

    // Add hover effect
    colorInput.onmouseover = function() {
        colorInput.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    };
    colorInput.onmouseout = function() {
        colorInput.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    };
function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues) return null;
    return `#${rgbValues.map(value => {
        const hexValue = parseInt(value).toString(16).padStart(2, '0');
        return hexValue;
    }).join('')}`;
}
    // Get current colors from root-page-mobile background
    const rootElement = document.getElementById('root-page-mobile');
if (rootElement) {
    const computedStyle = window.getComputedStyle(rootElement);
    const backgroundImage = computedStyle.backgroundImage;

    // Regex to match linear-gradient colors
    const gradientRegex = /rgb?\(([^)]+)\)|hsl?\(([^)]+)\)|#\w+/g;
    const colors = backgroundImage.match(gradientRegex);
    
    if (colors && colors.length > 0) {
        // Set the value of the color input to the first color in hex
        colorInput.value = colors[0].startsWith('rgb') ? rgbToHex(colors[0]) : colors[0];
    }
}
    description2Container.appendChild(description2);
    description2Container.appendChild(colorInput);

    const description3Container = document.createElement('div');
    description3Container.style.display = 'flex';
    description3Container.style.alignItems = 'center';
    description3Container.style.marginBottom = '10px';

    const description3 = document.createElement('p');
    description3.textContent = 'Color2:';
    description3.style.marginRight = '10px';
    description3.style.fontWeight = 'bold'; // Make the text bold

    const colorInput1 = document.createElement('input');
    colorInput1.type = 'color';
    colorInput1.style.width = '500px'; // Set a fixed width
    colorInput1.style.height = '40px'; // Set a fixed height
    colorInput1.style.border = 'none'; // Remove default border
    colorInput1.style.borderRadius = '4px'; // Slightly rounded corners
    colorInput1.style.cursor = 'pointer'; // Change cursor to pointer
    colorInput1.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)'; // Add shadow for depth
    colorInput1.style.transition = 'box-shadow 0.3s'; // Smooth transition for hover effect
    colorInput1.style.backgroundColor = 'transparent'; // Ensure background is transparent
    colorInput1.style.outline = 'none'; // Remove outline	 

    // Add hover effect
    colorInput1.onmouseover = function() {
        colorInput1.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    };
    colorInput1.onmouseout = function() {
        colorInput1.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    };
if (rootElement) {
    const computedStyle = window.getComputedStyle(rootElement);
    const backgroundImage = computedStyle.backgroundImage;

    // Regex to match linear-gradient colors
    const gradientRegex = /rgb?\(([^)]+)\)|hsl?\(([^)]+)\)|#\w+/g;
    const colors = backgroundImage.match(gradientRegex);
    
    if (colors && colors.length > 0) {
        // Set the value of the second color input to the second color in hex
        if (colors.length > 1) {
            colorInput1.value = colors[1].startsWith('rgb') ? rgbToHex(colors[1]) : colors[1];
        }
    }
}     
const savedColor1 = localStorage.getItem('color1') || '#150e2f';
const savedColor2 = localStorage.getItem('color2') || '#005e69';
    colorInput.value = savedColor1;
    colorInput1.value = savedColor2;

    colorInput.addEventListener('input', () => {
        localStorage.setItem('color1', colorInput.value);
        changeGradientColor(colorInput.value, colorInput1.value);
    });    
colorInput1.addEventListener('input', () => {        
	localStorage.setItem('color2', colorInput1.value);
        changeGradientColor(colorInput.value, colorInput1.value);
    });
    description3Container.appendChild(description3);
    description3Container.appendChild(colorInput1);

    contentBox.appendChild(title);
    contentBox.appendChild(description1);
    contentBox.appendChild(description2Container);
    contentBox.appendChild(description3Container);

    dialogContent.appendChild(contentBox);
    
    dialogPaper.appendChild(closeButton);
    dialogPaper.appendChild(dialogContent);
    
    dialogContainer.appendChild(dialogPaper);
    dialogRoot.appendChild(backdrop);
    dialogRoot.appendChild(dialogContainer);

    // Create and append sentinelStart
    const sentinelStart = document.createElement('div');
    sentinelStart.tabIndex = 0;
    sentinelStart.setAttribute('data-test', 'sentinelStart');
    dialogRoot.appendChild(sentinelStart);

    // Create and append sentinelEnd
    const sentinelEnd = document.createElement('div');
    sentinelEnd.tabIndex = 0;
    sentinelEnd.setAttribute('data-test', 'sentinelEnd');
    dialogRoot.appendChild(sentinelEnd);

    document.body.appendChild(dialogRoot);

    // Fade-in effect
    let fadeInOpacity = 0;
    const fadeDuration = 100; // milliseconds
    const intervalTime = 16; // approximately 60fps
    const step = intervalTime / fadeDuration; // amount to increase opacity

    const fadeIn = () => {
        fadeInOpacity += step;
        if (fadeInOpacity >= 1) {
            fadeInOpacity = 1; // Ensure it doesn't go over 1
            backdrop.style.opacity = fadeInOpacity;
            dialogContainer.style.opacity = fadeInOpacity;
            clearInterval(fadeInInterval);
        } else {
            backdrop.style.opacity = fadeInOpacity;
            dialogContainer.style.opacity = fadeInOpacity;
        }
    };
    const fadeInInterval = setInterval(fadeIn, intervalTime);

    // Set initial opacity to 1 after appending to the body
    setTimeout(() => {
        backdrop.style.opacity = '1';
        dialogContainer.style.opacity = '1';
    }, 0);
}
// Call the functions to apply the gradient and add the icon
const initialColor1 = localStorage.getItem('color1') || '#150e2f';
const initialColor2 = localStorage.getItem('color2') || '#005e69';
changeGradientColor(initialColor1, initialColor2);
    setTimeout(() => {
        addIconToNavMenu();
    }, 400);
