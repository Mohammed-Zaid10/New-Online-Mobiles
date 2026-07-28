import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Fold3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- 3D Scene Setup ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8); // Straight-on view, no spinning camera

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x4ade80, 0.8); // Soft green accent fill
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    // --- Root Group (Fixed orientation - NO 360 Y Rotation) ---
    const rootGroup = new THREE.Group();
    // Slight fixed tilt for luxury product presentation angle
    rootGroup.rotation.x = 0.08;
    scene.add(rootGroup);

    // Forest Green Body & Hinge Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1f2a24, // Real Galaxy Z Fold 8 Forest Green
      metalness: 0.75,
      roughness: 0.3,
    });

    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0x2b3931,
      metalness: 0.9,
      roughness: 0.18,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050608,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Texture Loaders for Cover Screen & Inner Screen
    const textureLoader = new THREE.TextureLoader();
    const coverTex = textureLoader.load("/fold-cover.png");
    const innerTex = textureLoader.load("/fold-inner.png");

    coverTex.colorSpace = THREE.SRGBColorSpace;
    innerTex.colorSpace = THREE.SRGBColorSpace;

    // Dynamic Display Materials (with opacity/emissive controls for screen turning on)
    const coverScreenMat = new THREE.MeshBasicMaterial({
      map: coverTex,
      transparent: true,
      opacity: 0, // Starts off
    });

    const innerScreenMat = new THREE.MeshBasicMaterial({
      map: innerTex,
      transparent: true,
      opacity: 0, // Starts off
    });

    // Phone Wing Dimensions
    const w = 1.25;
    const h = 2.65;
    const d = 0.07;

    // --- Left Wing (Fixed back panel with camera bump) ---
    const leftWingGroup = new THREE.Group();
    rootGroup.add(leftWingGroup);

    const leftMeshGroup = new THREE.Group();
    leftMeshGroup.position.set(-w / 2, 0, 0);
    leftWingGroup.add(leftMeshGroup);

    const bodyGeo = new THREE.BoxGeometry(w, h, d);
    const leftBodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    leftBodyMesh.castShadow = true;
    leftBodyMesh.receiveShadow = true;
    leftMeshGroup.add(leftBodyMesh);

    // Left Inner Display Face
    const screenGeo = new THREE.PlaneGeometry(w - 0.05, h - 0.06);
    const leftInnerScreen = new THREE.Mesh(screenGeo, innerScreenMat);
    leftInnerScreen.position.set(0, 0, d / 2 + 0.002);
    leftMeshGroup.add(leftInnerScreen);

    // Outer Back Panel of Left Wing (Back cover + 3 Camera Lenses)
    const camHousingGeo = new THREE.BoxGeometry(0.36, 1.1, 0.06);
    const camHousing = new THREE.Mesh(camHousingGeo, bodyMat);
    camHousing.position.set(-w / 4, h / 4, -d / 2 - 0.03);
    leftMeshGroup.add(camHousing);

    for (let i = 0; i < 3; i++) {
      const lensRing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.03, 24),
        hingeMat
      );
      lensRing.rotation.x = Math.PI / 2;
      lensRing.position.set(-w / 4, h / 4 + 0.32 - i * 0.32, -d / 2 - 0.06);
      leftMeshGroup.add(lensRing);

      const lensGlass = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 0.032, 24),
        glassMat
      );
      lensGlass.rotation.x = Math.PI / 2;
      lensGlass.position.set(-w / 4, h / 4 + 0.32 - i * 0.32, -d / 2 - 0.062);
      leftMeshGroup.add(lensGlass);
    }

    // --- Right Wing (Hinged to open/unfold) ---
    const rightWingGroup = new THREE.Group();
    rootGroup.add(rightWingGroup);

    const rightMeshGroup = new THREE.Group();
    rightMeshGroup.position.set(w / 2, 0, 0);
    rightWingGroup.add(rightMeshGroup);

    const rightBodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    rightBodyMesh.castShadow = true;
    rightBodyMesh.receiveShadow = true;
    rightMeshGroup.add(rightBodyMesh);

    // Right Inner Display Face
    const rightInnerScreen = new THREE.Mesh(screenGeo, innerScreenMat);
    rightInnerScreen.position.set(0, 0, d / 2 + 0.002);
    rightMeshGroup.add(rightInnerScreen);

    // Outer Cover Screen (on back of right wing - faces front when folded)
    const coverScreenMesh = new THREE.Mesh(screenGeo, coverScreenMat);
    coverScreenMesh.position.set(0, 0, -d / 2 - 0.002);
    coverScreenMesh.rotation.y = Math.PI;
    rightMeshGroup.add(coverScreenMesh);

    // --- Center Hinge Cylinder ---
    const hingeGeo = new THREE.CylinderGeometry(0.05, 0.05, h - 0.04, 32);
    const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
    hingeMesh.position.set(0, 0, 0);
    rootGroup.add(hingeMesh);

    // --- Soft Ground Shadow ---
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const g = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(0, 0, 0, 0.65)");
      g.addColorStop(0.5, "rgba(0, 0, 0, 0.2)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = g;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.0;
    scene.add(shadowMesh);

    // --- Animation Timeline Controller (No 360 rotation, pure mechanical unfold) ---
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isTabActive = true;

    const handleVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.clientWidth || 280;
      const nh = containerRef.current.clientHeight || 300;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    const totalCycle = 7.0; // 7 seconds per full loop

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabActive) return;

      const time = clock.getElapsedTime();
      const cycleProgress = (time % totalCycle) / totalCycle; // 0.0 to 1.0

      // Step 1 (0.0 -> 0.20): Phone Closed (0° fold), Screen Off
      // Step 2 (0.20 -> 0.50): Smooth Unfold to 90° + Cover Screen Fades On
      // Step 3 (0.50 -> 0.80): Flip/Unfold to 180° Flat + Inner Main Display Lights Up
      // Step 4 (0.80 -> 1.00): Smooth Fold Back Closed

      let foldAngle = Math.PI - 0.1; // Closed parallel angle (near 180° wing angle difference)
      let coverOpacity = 0;
      let innerOpacity = 0;

      if (cycleProgress < 0.2) {
        // Step 1: Fully Closed, Screens Off
        foldAngle = Math.PI - 0.1;
        coverOpacity = 0;
        innerOpacity = 0;
      } else if (cycleProgress >= 0.2 && cycleProgress < 0.5) {
        // Step 2: Smoothly Unfolding to ~80°, Cover Screen Turns On
        const p = (cycleProgress - 0.2) / 0.3;
        const eased = THREE.MathUtils.smoothstep(p, 0, 1);
        foldAngle = THREE.MathUtils.lerp(Math.PI - 0.1, Math.PI * 0.45, eased);
        coverOpacity = THREE.MathUtils.clamp(eased * 1.5, 0, 1);
        innerOpacity = 0;
      } else if (cycleProgress >= 0.5 && cycleProgress < 0.8) {
        // Step 3: Opening Flat to 180°, Main Inner Display Turns On
        const p = (cycleProgress - 0.5) / 0.3;
        const eased = THREE.MathUtils.smoothstep(p, 0, 1);
        foldAngle = THREE.MathUtils.lerp(Math.PI * 0.45, 0.02, eased);
        coverOpacity = 1 - eased; // Cover screen fades out as inner display opens
        innerOpacity = THREE.MathUtils.clamp(eased * 1.5, 0, 1);
      } else {
        // Step 4: Smoothly Folding Back to Closed State
        const p = (cycleProgress - 0.8) / 0.2;
        const eased = THREE.MathUtils.smoothstep(p, 0, 1);
        foldAngle = THREE.MathUtils.lerp(0.02, Math.PI - 0.1, eased);
        innerOpacity = 1 - eased;
        coverOpacity = 0;
      }

      // Apply wing angles (NO 360 Y ROTATION)
      leftWingGroup.rotation.y = foldAngle / 2;
      rightWingGroup.rotation.y = -foldAngle / 2;

      // Update screen opacities
      coverScreenMat.opacity = coverOpacity;
      innerScreenMat.opacity = innerOpacity;

      // Subtle float & shadow response
      const floatY = Math.sin(time * 2) * 0.06;
      rootGroup.position.y = floatY;
      shadowMesh.scale.setScalar(1 - floatY * 0.1);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      renderer.dispose();
      bodyGeo.dispose();
      bodyMat.dispose();
      hingeGeo.dispose();
      hingeMat.dispose();
      glassMat.dispose();
    };
  }, []);

  const handleClick = () => {
    const elem = document.getElementById("samsung-section") || document.getElementById("featured-mobiles");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed bottom-[30px] right-[30px] z-50 cursor-pointer select-none transition-transform duration-500 ease-out group"
      style={{
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Samsung Galaxy Z Fold — Click to explore Samsung smartphones"
    >
      {/* 3D WebGL Unfolding Animation Canvas */}
      <div
        ref={containerRef}
        className="w-[200px] h-[240px] sm:w-[240px] sm:h-[280px] lg:w-[270px] lg:h-[310px] relative"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
