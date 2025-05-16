const register3D = {
  scene: null,
  camera: null,
  renderer: null,
  registerModel: null,
  isRotating: false,
  targetRotation: { x: 0.5, y: 0.7 },
  currentRotation: { x: 1, y: -3 },
  mousePosition: { x: 0, y: 0 },
  animationId: null,
  container: null,
  machineElement: null,

  CONTAINER_WIDTH: 260,
  CONTAINER_HEIGHT: 200,
  BODY_COLOR: 0xbdc3c7,
  ACCENT_COLOR: 0x34495e,
  BUTTON_COLOR: 0xe67e22,
  DISPLAY_SCREEN_COLOR: 0x2c3e50,
  KEY_TOP_COLOR: 0xf1c40f,
  ROTATION_SMOOTHING: 0.1,
  FLOAT_SPEED: 0.001,
  FLOAT_AMOUNT: 0.05,

  init: function () {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupLights();
    this.createRegisterModel();
    this.createContainer();
    this.setupEventListeners();
    this.animate();
  },

  setupScene: function () {
    this.scene = new THREE.Scene();
  },

  setupCamera: function () {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.CONTAINER_WIDTH / this.CONTAINER_HEIGHT,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.camera.position.y = -1;
  },

  setupRenderer: function () {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.CONTAINER_WIDTH, this.CONTAINER_HEIGHT);
    this.renderer.setClearColor(0x000000, 0);
  },

  setupLights: function () {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
  },

  createRegisterModel: function () {
    this.registerModel = new THREE.Group();

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: this.BODY_COLOR,
      roughness: 0.4,
      metalness: 0.6,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: this.ACCENT_COLOR,
      roughness: 0.5,
      metalness: 0.3,
    });

    const displayScreenMaterial = new THREE.MeshStandardMaterial({
      color: this.DISPLAY_SCREEN_COLOR,
      roughness: 0.1,
      metalness: 0.2,
      emissive: 0x3498db,
      emissiveIntensity: 0.1,
    });

    const buttonMaterial = new THREE.MeshStandardMaterial({
      color: this.BUTTON_COLOR,
      roughness: 0.6,
      metalness: 0.1,
    });

    const keyTopMaterial = new THREE.MeshStandardMaterial({
      color: this.KEY_TOP_COLOR,
      roughness: 0.7,
      metalness: 0.1,
    });

    // Model geometry creation (same as before, using constants)
    const baseWidth = 4.5;
    const baseHeight = 0.8;
    const baseDepth = 3;
    const baseGeometry = new THREE.BoxGeometry(
      baseWidth,
      baseHeight,
      baseDepth
    );
    const base = new THREE.Mesh(baseGeometry, bodyMaterial);
    base.position.y = -1.6;
    this.registerModel.add(base);

    const mainBodyWidth = 4.2;
    const mainBodyHeight = 1.0;
    const mainBodyDepth = 2.8;

    const mainBody = new THREE.Mesh(
      new THREE.BoxGeometry(mainBodyWidth, mainBodyHeight, mainBodyDepth),
      bodyMaterial
    );
    mainBody.position.y = -1.6 + baseHeight / 2 + mainBodyHeight / 2;
    this.registerModel.add(mainBody);

    const topSectionWidth = mainBodyWidth * 0.6;
    const topSectionHeight = 0.9;
    const topSectionDepth = mainBodyDepth * 0.85;
    const topSection = new THREE.Mesh(
      new THREE.BoxGeometry(topSectionWidth, topSectionHeight, topSectionDepth),
      accentMaterial
    );
    topSection.position.y =
      mainBody.position.y + mainBodyHeight / 1.5 - topSectionHeight / 2 + 0.3;
    topSection.position.z = -0.1;
    topSection.rotation.x = -Math.PI / -9;
    topSection.rotation.y = Math.PI;
    this.registerModel.add(topSection);

    const displayWidth = 2.5;
    const displayHeight = 1.2;
    const displayDepth = 0.3;
    const displayHousing = new THREE.Mesh(
      new THREE.BoxGeometry(displayWidth, displayHeight, displayDepth),
      accentMaterial
    );
    displayHousing.position.y = topSection.position.y + displayHeight / 2 + 1;
    displayHousing.position.z = -1.2;
    displayHousing.rotation.x = Math.PI / 10;
    this.registerModel.add(displayHousing);

    const displayScreen = new THREE.Mesh(
      new THREE.BoxGeometry(displayWidth * 0.85, displayHeight * 0.7, 0.1),
      displayScreenMaterial
    );
    displayScreen.position.z = displayDepth / 2 + 0.06;
    displayHousing.add(displayScreen);

    const keySize = 0.4;
    const keyHeight = 0.15;
    const keySpacing = 0.5;
    const numRows = 4;
    const numCols = 3;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const keyGeometry = new THREE.BoxGeometry(keySize, keyHeight, keySize);
        const key = new THREE.Mesh(keyGeometry, buttonMaterial);
        const keyTopGeo = new THREE.CircleGeometry(keySize * 0.4, 16);
        const keyTop = new THREE.Mesh(keyTopGeo, keyTopMaterial);

        key.add(keyTop);
        keyTop.rotation.x = -Math.PI / 2;
        keyTop.position.y = keyHeight / 2 + 0.01;

        key.position.x = (col - (numCols - 1) / 2) * keySpacing;
        key.position.z = (row - (numRows - 1) / 2) * keySpacing * 1.1;
        key.position.y = topSectionHeight / 2 + keyHeight / 2;
        topSection.add(key);
      }
    }

    const openDrawerButtonGeo = new THREE.BoxGeometry(
      keySize * 2,
      keyHeight,
      keySize
    );
    const openDrawerButton = new THREE.Mesh(
      openDrawerButtonGeo,
      buttonMaterial
    );
    openDrawerButton.position.set(
      0,
      topSectionHeight / 2 + keyHeight / 2,
      (numRows / 2) * keySpacing * 1.1 + keySize
    );
    topSection.add(openDrawerButton);

    const drawerWidth = baseWidth * 0.85;
    const drawerHeight = baseHeight * 0.8;
    const drawerDepth = baseDepth * 0.9;
    const drawerGeometry = new THREE.BoxGeometry(
      drawerWidth,
      drawerHeight,
      drawerDepth
    );
    const drawer = new THREE.Mesh(drawerGeometry, accentMaterial);
    drawer.position.y = base.position.y + baseHeight / 2 - drawerHeight / 1.9;
    drawer.position.z = baseDepth / 2 - drawerDepth / 2 + 0.3;
    this.registerModel.add(drawer);

    const drawerHandleGeo = new THREE.BoxGeometry(
      drawerWidth * 0.3,
      drawerHeight * 0.4,
      0.1
    );
    const drawerHandle = new THREE.Mesh(drawerHandleGeo, bodyMaterial);
    drawerHandle.position.z = drawerDepth / 2 + 0.05;
    drawerHandle.position.y = 0;
    drawer.add(drawerHandle);

    this.registerModel.scale.set(1.1, 1.1, 1.1);

    this.scene.add(this.registerModel);
  },

  createContainer: function () {
    this.container = document.createElement("div");
    this.container.id = "register-3d-container";
    this.container.appendChild(this.renderer.domElement);
    this.container.style.position = "relative";
    this.container.style.width = `${this.CONTAINER_WIDTH}px`;
    this.container.style.height = `${this.CONTAINER_HEIGHT}px`;
    this.container.style.margin = "20px 0";
    this.container.style.cursor = "pointer";

    this.machineElement = document.querySelector(".machine");
    this.machineElement.parentNode.insertBefore(
      this.container,
      this.machineElement
    );
    this.machineElement.style.display = "none";
  },

  setupEventListeners: function () {
    this.container.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.container.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.container.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.container.addEventListener("click", this.onClick.bind(this));

    this.container.addEventListener("touchmove", this.onTouchMove.bind(this), {
      passive: false,
    });
    this.container.addEventListener(
      "touchstart",
      this.onTouchStart.bind(this),
      { passive: false }
    );
    this.container.addEventListener("touchend", this.onTouchEnd.bind(this), {
      passive: false,
    });
  },

  onMouseMove: function (event) {
    const rect = this.container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    if (this.isRotating) {
      this.targetRotation.y += event.movementX * 0.02;
      this.targetRotation.x += event.movementY * 0.02;
    } else {
      this.targetRotation.y = x * 0.8;
      this.targetRotation.x = y * 0.6;
    }
  },

  onMouseDown: function () {
    this.isRotating = true;
  },

  onMouseUp: function () {
    this.isRotating = false;
  },

  onClick: function () {
    this.shrinkAnimation();
  },

  onTouchMove: function (event) {
    event.preventDefault();
    const touch = event.touches[0];
    const rect = this.container.getBoundingClientRect();
    const simulatedMovementX =
      touch.clientX - (this.mousePosition.clientX || touch.clientX);
    const simulatedMovementY =
      touch.clientY - (this.mousePosition.clientY || touch.clientY);

    this.mousePosition.clientX = touch.clientX;
    this.mousePosition.clientY = touch.clientY;

    const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

    if (this.isRotating) {
      this.targetRotation.y += simulatedMovementX * 0.02;
      this.targetRotation.x += simulatedMovementY * 0.02;
    } else {
      this.targetRotation.y = x * 0.8;
      this.targetRotation.x = y * 0.6;
    }
  },

  onTouchStart: function (event) {
    event.preventDefault();
    this.onMouseDown();
    if (event.touches.length > 0) {
      this.mousePosition.clientX = event.touches[0].clientX;
      this.mousePosition.clientY = event.touches[0].clientY;
    }
  },

  onTouchEnd: function (event) {
    event.preventDefault();
    this.onMouseUp();
    this.onClick();
    this.mousePosition.clientX = undefined;
    this.mousePosition.clientY = undefined;
  },

  shrinkAnimation: function () {
    let scale = 1;
    const duration = 250;
    const startTime = performance.now();

    const animateShrink = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      scale = 1 - progress;

      if (this.registerModel) {
        this.registerModel.scale.set(scale, scale, scale);
        this.renderer.render(this.scene, this.camera);
      }

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animateShrink);
      } else {
        if (this.container) {
          this.container.style.display = "none";
        }
        if (this.machineElement) {
          this.machineElement.style.display = "block";
        }
        // Important: Cancel the main animation loop if needed, or manage its state
        // If the main animation loop should stop after shrinking, add logic here.
        // For now, assuming the main loop continues but doesn't render the hidden model/container.
        // Or you could stop the main animation loop and start it again if the 3D view is ever re-shown.
      }
    };

    this.animationId = requestAnimationFrame(animateShrink);
  },

  animate: function () {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    if (
      this.registerModel &&
      this.container &&
      this.container.style.display !== "none"
    ) {
      this.currentRotation.x +=
        (this.targetRotation.x - this.currentRotation.x) *
        this.ROTATION_SMOOTHING;
      this.currentRotation.y +=
        (this.targetRotation.y - this.currentRotation.y) *
        this.ROTATION_SMOOTHING;

      this.registerModel.rotation.x = this.currentRotation.x;
      this.registerModel.rotation.y = this.currentRotation.y;

      this.registerModel.position.y =
        Math.sin(Date.now() * this.FLOAT_SPEED) * this.FLOAT_AMOUNT;

      this.renderer.render(this.scene, this.camera);
    } else if (this.animationId) {
      // If the container is hidden and animation is running, stop it.
      // This prevents unnecessary rendering when the 3D model is not visible.
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  script.onload = () => {
    register3D.init();
  };
  document.head.appendChild(script);

  // Assuming updatePriceLabel exists elsewhere if this line is needed
  const priceInput = document.getElementById("current-price");
  if (priceInput && typeof updatePriceLabel !== "undefined") {
    priceInput.addEventListener("change", updatePriceLabel);
  }
});
