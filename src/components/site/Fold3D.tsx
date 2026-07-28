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
    const height = container.clientHeight || 320;

    // LOCKED FRONT-FACING CAMERA - NEVER MOVES OR ROTATES
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);
    camera.lookAt(0, 0, 0);

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

    // --- Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x3b82f6, 1.0);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    const topLight = new THREE.DirectionalLight(0xfbbf24, 1.0);
    topLight.position.set(0, 7, -4);
    scene.add(topLight);

    // --- Pearl White & Silver Chrome Materials ---
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf5f7fa, // Pure Pearl White / Titanium White
      metalness: 0.45,
      roughness: 0.22,
    });

    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Polished Silver Chrome
      metalness: 0.95,
      roughness: 0.1,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050608,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1.0,
    });

    // Texture Loaders for Cover Screen & Inner Screen Wallpapers
    const textureLoader = new THREE.TextureLoader();
    const coverTex = textureLoader.load("/fold-cover.png");
    const innerTex = textureLoader.load("/fold-inner.png");

    coverTex.colorSpace = THREE.SRGBColorSpace;
    innerTex.colorSpace = THREE.SRGBColorSpace;

    const coverScreenMat = new THREE.MeshBasicMaterial({
      map: coverTex,
      transparent: true,
      opacity: 0,
    });

    const innerScreenMat = new THREE.MeshBasicMaterial({
      map: innerTex,
      transparent: true,
      opacity: 0,
    });

    // Root Group - Locked Facing Viewer
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Wing Dimensions
    const w = 1.25;
    const h = 2.65;
    const d = 0.07;

    // --- Left Wing ---
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

    // Left Inner Display Screen (+Z face)
    const screenGeo = new THREE.PlaneGeometry(w - 0.05, h - 0.06);
    const leftInnerScreen = new THREE.Mesh(screenGeo, innerScreenMat);
    leftInnerScreen.position.set(0, 0, d / 2 + 0.002);
    leftMeshGroup.add(leftInnerScreen);

    // Outer Back Panel of Left Wing (-Z face): Pearl White Triple Camera Module
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

    // --- Right Wing ---
    const rightWingGroup = new THREE.Group();
    rootGroup.add(rightWingGroup);

    const rightMeshGroup = new THREE.Group();
    rightMeshGroup.position.set(w / 2, 0, 0);
    rightWingGroup.add(rightMeshGroup);

    const rightBodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    rightBodyMesh.castShadow = true;
    rightBodyMesh.receiveShadow = true;
    rightMeshGroup.add(rightBodyMesh);

    // Right Inner Display Screen (+Z face)
    const rightInnerScreen = new THREE.Mesh(screenGeo, innerScreenMat);
    rightInnerScreen.position.set(0, 0, d / 2 + 0.002);
    rightMeshGroup.add(rightInnerScreen);

    // Outer Cover Screen (-Z face)
    const coverScreenMesh = new THREE.Mesh(screenGeo, coverScreenMat);
    coverScreenMesh.position.set(0, 0, -d / 2 - 0.002);
    coverScreenMesh.rotation.y = Math.PI;
    rightMeshGroup.add(coverScreenMesh);

    // --- Center Hinge Spine ---
    const hingeGeo = new THREE.CylinderGeometry(0.05, 0.05, h - 0.04, 32);
    const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
    hingeMesh.position.set(0, 0, 0);
    rootGroup.add(hingeMesh);

    // --- Ground Shadow ---
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const g = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(0, 0, 0, 0.6)");
      g.addColorStop(0.5, "rgba(0, 0, 0, 0.18)");
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

    // --- Animation Timeline Controller (FRONT-FACING MORPH) ---
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
      const nh = containerRef.current.clientHeight || 320;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    const cycleDuration = 7.5; // 7.5 seconds loop

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabActive) return;

      const time = clock.getElapsedTime();
      const progress = (time % cycleDuration) / cycleDuration; // 0.0 to 1.0

      // POSE MORPH TIMELINE (FRONT-FACING CAMERA IS 100% LOCKED):
      // Pose 1 (0.0 -> 0.20): Closed Phone (back panel facing user), Screen Off
      // Pose 2 (0.20 -> 0.50): Unfolding (~80° hinge angle) + Cover Screen Fades On
      // Pose 3 (0.50 -> 0.80): Open Main Inner Screen 180° Flat + Inner Display Fades On
      // Pose 4 (0.80 -> 1.00): Smooth Fold Back to Pose 1

      let foldAngle = Math.PI - 0.05; // Closed wing angle
      let coverOpacity = 0;
      let innerOpacity = 0;

      if (progress < 0.2) {
        // Pose 1: Closed, back panel facing user
        foldAngle = Math.PI - 0.05;
        coverOpacity = 0;
        innerOpacity = 0;
      } else if (progress >= 0.2 && progress < 0.5) {
        // Pose 2: Unfolding, Cover Screen Lights Up
        const p = (progress - 0.2) / 0.3;
        const eased = THREE.MathUtils.smoothstep(p, 0, 1);
        foldAngle = THREE.MathUtils.lerp(Math.PI - 0.05, Math.PI * 0.45, eased);
        coverOpacity = THREE.MathUtils.clamp(eased * 1.5, 0, 1);
        innerOpacity = 0;
      } else if (progress >= 0.5 && progress < 0.8) {
        // Pose 3: Unfolding Flat to 180°, Main Inner Display Lights Up
        const p = (progress - 0.5) / 0.3;
        const eased = THREE.MathUtils.smoothstep(p, 0, 1);
        foldAngle = THREE.MathUtils.lerp(Math.PI * 0.45, 0.02, eased);
        coverOpacity = 1 - eased;
        innerOpacity = THREE.MathUtils.clamp(eased * 1.5, 0, 1);
      } else {
        // Pose 4: Smoothly Folding Back
        const p = (progress - 0.8) / 0.2;
        const eased = THREE.MathUtils.smoothstep(p, 0, 1);
        foldAngle = THREE.MathUtils.lerp(0.02, Math.PI - 0.05, eased);
        innerOpacity = 1 - eased;
        coverOpacity = 0;
      }

      // Apply Hinge Wing Angles (CAMERA Y ROTATION IS LOCKED TO 0)
      leftWingGroup.rotation.y = foldAngle / 2;
      rightWingGroup.rotation.y = -foldAngle / 2;

      // Update Screen Opacities
      coverScreenMat.opacity = coverOpacity;
      innerScreenMat.opacity = innerOpacity;

      // Gentle floating motion
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
      title="Samsung Galaxy Z Fold — Click to view Samsung smartphones"
    >
      <div
        ref={containerRef}
        className="w-[200px] h-[240px] sm:w-[240px] sm:h-[280px] lg:w-[270px] lg:h-[310px] relative"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
