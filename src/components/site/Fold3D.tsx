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

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x3b82f6, 1.8); // Subtle blue fill light
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const topLight = new THREE.DirectionalLight(0xfbbf24, 1.2); // Warm gold rim
    topLight.position.set(0, 8, -4);
    scene.add(topLight);

    // --- Create Galaxy Z Fold Model ---
    // Root group for floating & rotating
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x141518,
      metalness: 0.85,
      roughness: 0.25,
    });

    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0x2d3036,
      metalness: 0.95,
      roughness: 0.15,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x07080a,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Create Inner Display Wallpaper Texture procedurally
    const createScreenTexture = (text: string) => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 512;
      texCanvas.height = 1024;
      const ctx = texCanvas.getContext("2d");
      if (ctx) {
        // Dark AMOLED luxury gradient wallpaper
        const grad = ctx.createLinearGradient(0, 0, 512, 1024);
        grad.addColorStop(0, "#080b14");
        grad.addColorStop(0.3, "#0d1936");
        grad.addColorStop(0.7, "#1d102f");
        grad.addColorStop(1, "#050608");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 1024);

        // Vibrant abstract silk curves (Samsung Fold signature style)
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.filter = "blur(30px)";

        // Curve 1: Deep Cyan/Blue
        ctx.beginPath();
        ctx.fillStyle = "rgba(59, 130, 246, 0.7)";
        ctx.arc(256, 400, 180, 0, Math.PI * 2);
        ctx.fill();

        // Curve 2: Gold/Purple Ribbon
        ctx.beginPath();
        ctx.fillStyle = "rgba(245, 158, 11, 0.6)";
        ctx.arc(320, 600, 160, 0, Math.PI * 2);
        ctx.fill();

        // Curve 3: Violet Glow
        ctx.beginPath();
        ctx.fillStyle = "rgba(168, 85, 247, 0.5)";
        ctx.arc(180, 520, 140, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Subtle logo text & UI overlay
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Galaxy Z Fold", 256, 120);

        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.font = "18px sans-serif";
        ctx.fillText(text, 256, 155);

        // Time widget
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 64px sans-serif";
        ctx.fillText("10:08", 256, 260);

        // Bottom app bar indicator
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        ctx.roundRect(176, 980, 160, 6, 3);
        ctx.fill();
      }
      const texture = new THREE.CanvasTexture(texCanvas);
      texture.needsUpdate = true;
      return texture;
    };

    const screenTextureLeft = createScreenTexture("Left Inner Display");
    const screenTextureRight = createScreenTexture("Right Inner Display");
    const coverTexture = createScreenTexture("Cover Screen");

    const screenMatLeft = new THREE.MeshBasicMaterial({ map: screenTextureLeft });
    const screenMatRight = new THREE.MeshBasicMaterial({ map: screenTextureRight });
    const coverScreenMat = new THREE.MeshBasicMaterial({ map: coverTexture });

    // Wing Dimensions
    const w = 1.25; // Wing width
    const h = 2.7;  // Height
    const d = 0.08; // Thickness

    // --- Left Wing (Includes Hinge Axis at x = 0) ---
    const leftWingGroup = new THREE.Group();
    rootGroup.add(leftWingGroup);

    // Left Wing Body
    const leftMeshGroup = new THREE.Group();
    leftMeshGroup.position.set(-w / 2, 0, 0); // Center mesh within its group
    leftWingGroup.add(leftMeshGroup);

    const bodyGeo = new THREE.BoxGeometry(w, h, d);
    const leftBodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    leftBodyMesh.castShadow = true;
    leftBodyMesh.receiveShadow = true;
    leftMeshGroup.add(leftBodyMesh);

    // Left Inner Screen (facing +Z relative to left wing)
    const screenGeo = new THREE.PlaneGeometry(w - 0.06, h - 0.08);
    const leftScreen = new THREE.Mesh(screenGeo, screenMatLeft);
    leftScreen.position.set(0, 0, d / 2 + 0.002);
    leftMeshGroup.add(leftScreen);

    // Outer Back Panel of Left Wing (Back cover + Camera bump)
    const camHousingGeo = new THREE.BoxGeometry(0.36, 1.1, 0.06);
    const camHousing = new THREE.Mesh(camHousingGeo, bodyMat);
    camHousing.position.set(-w / 4, h / 4, -d / 2 - 0.03);
    leftMeshGroup.add(camHousing);

    // 3 Camera Lenses
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

    // --- Right Wing (Attached at Hinge x = 0) ---
    const rightWingGroup = new THREE.Group();
    rootGroup.add(rightWingGroup);

    const rightMeshGroup = new THREE.Group();
    rightMeshGroup.position.set(w / 2, 0, 0);
    rightWingGroup.add(rightMeshGroup);

    const rightBodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    rightBodyMesh.castShadow = true;
    rightBodyMesh.receiveShadow = true;
    rightMeshGroup.add(rightBodyMesh);

    // Right Inner Screen (facing +Z)
    const rightScreen = new THREE.Mesh(screenGeo, screenMatRight);
    rightScreen.position.set(0, 0, d / 2 + 0.002);
    rightMeshGroup.add(rightScreen);

    // Outer Cover Screen (on back of right wing - facing -Z)
    const coverScreen = new THREE.Mesh(screenGeo, coverScreenMat);
    coverScreen.position.set(0, 0, -d / 2 - 0.002);
    coverScreen.rotation.y = Math.PI; // Face outwards back
    rightMeshGroup.add(coverScreen);

    // --- Hinge Spine ---
    const hingeGeo = new THREE.CylinderGeometry(0.06, 0.06, h - 0.04, 32);
    const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
    hingeMesh.position.set(0, 0, 0);
    rootGroup.add(hingeMesh);

    // --- Floor Shadow Plane ---
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const g = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(0, 0, 0, 0.6)");
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
    shadowMesh.position.y = -2.1;
    scene.add(shadowMesh);

    // --- Animation Loop Variables ---
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isTabActive = true;

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.clientWidth || 300;
      const nh = containerRef.current.clientHeight || 340;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    const cycleDuration = 14; // 14 seconds full loop cycle

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabActive) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Floating Movement (Sine wave 8-12px float)
      const floatY = Math.sin(time * 2) * 0.12;
      rootGroup.position.y = floatY;
      shadowMesh.scale.setScalar(1 - floatY * 0.15);

      // Rotation & Fold Cycle Progress (0 to 1)
      const cycleProgress = (time % cycleDuration) / cycleDuration;

      // Rotation Speed (slow down when hovered)
      const rotSpeed = hoverRef.current ? 0.3 : 1.0;
      rootGroup.rotation.y += delta * 0.45 * rotSpeed;

      // Smooth Fold/Unfold Animation Sequence:
      // 0.0 -> 0.15: Folded (0°)
      // 0.15 -> 0.45: Unfolding to 180° (Inner Screen)
      // 0.45 -> 0.70: Fully Unfolded showcase (180°)
      // 0.70 -> 0.90: Folding back to 0°
      // 0.90 -> 1.00: Folded pause
      let foldTarget = 0; // 0 = closed, 1 = 180° open
      if (cycleProgress >= 0.15 && cycleProgress < 0.45) {
        const p = (cycleProgress - 0.15) / 0.3;
        foldTarget = THREE.MathUtils.smoothstep(p, 0, 1);
      } else if (cycleProgress >= 0.45 && cycleProgress < 0.7) {
        foldTarget = 1;
      } else if (cycleProgress >= 0.7 && cycleProgress < 0.9) {
        const p = (cycleProgress - 0.7) / 0.2;
        foldTarget = 1 - THREE.MathUtils.smoothstep(p, 0, 1);
      } else {
        foldTarget = 0;
      }

      // Calculate wing angles based on foldTarget
      // When foldTarget = 0: Left wing angle = +90° (+Math.PI/2), Right wing angle = -90° (-Math.PI/2) -> Closed parallel
      // When foldTarget = 1: Left wing angle = 0°, Right wing angle = 0° -> Unfolded 180° flat
      const targetAngle = (1 - foldTarget) * (Math.PI / 2 - 0.05);

      // Smooth interpolation for fold angles
      leftWingGroup.rotation.y = THREE.MathUtils.lerp(
        leftWingGroup.rotation.y,
        targetAngle,
        0.08
      );
      rightWingGroup.rotation.y = THREE.MathUtils.lerp(
        rightWingGroup.rotation.y,
        -targetAngle,
        0.08
      );

      // Subtle tilt for 3D realism
      rootGroup.rotation.x = Math.sin(time * 1.5) * 0.08;
      rootGroup.rotation.z = Math.cos(time * 1.2) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      renderer.dispose();
      bodyGeo.dispose();
      bodyMat.dispose();
      hingeGeo.dispose();
      hingeMat.dispose();
      glassMat.dispose();
    };
  }, []);

  const handleClick = () => {
    // Smooth scroll to Featured Samsung Phones / Brands section
    const elem = document.getElementById("samsung-section") || document.getElementById("featured-mobiles");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-40 hidden sm:block cursor-pointer select-none transition-transform duration-500 ease-out"
      style={{
        transform: isHovered ? "scale(1.06)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Click to explore Samsung Galaxy Z Fold & Foldables"
    >
      {/* Subtle Premium Blue Ambient Glow (10-15% opacity, large blur) */}
      <div
        className="absolute inset-0 -z-10 rounded-full bg-blue-500/15 blur-3xl transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.35 : 0.15,
          transform: "scale(1.4)",
        }}
      />

      {/* Floating Badge Tag */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-full border border-blue-500/40 bg-slate-950/90 px-3 py-1 text-[11px] font-semibold text-blue-300 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:border-blue-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping mr-1.5" />
        Galaxy Z Fold 3D
      </div>

      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-[240px] h-[280px] md:w-[280px] md:h-[320px] lg:w-[310px] lg:h-[350px] relative"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
