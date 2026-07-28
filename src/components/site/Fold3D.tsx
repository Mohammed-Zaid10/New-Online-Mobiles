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

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

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

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x22c55e, 1.2); // Soft green accent fill
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const topLight = new THREE.DirectionalLight(0xfbbf24, 1.0); // Warm gold rim
    topLight.position.set(0, 8, -4);
    scene.add(topLight);

    // --- Create Galaxy Z Fold 8 Ultra Model ---
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Forest / Dark Olive Green Body Material (Matching uploaded image)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e2723, // Real Fold 8 Ultra Forest Green
      metalness: 0.75,
      roughness: 0.35,
    });

    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0x2b3630,
      metalness: 0.9,
      roughness: 0.2,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x07080a,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Texture Loader for Real Galaxy Z Fold 8 Ultra Image
    const textureLoader = new THREE.TextureLoader();
    const realTexture = textureLoader.load("/galaxy-fold8-real.png");
    realTexture.colorSpace = THREE.SRGBColorSpace;

    // Fallback/Inner texture with Galaxy Z Fold 8 Ultra graphics
    const createScreenTexture = (text: string) => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 512;
      texCanvas.height = 1024;
      const ctx = texCanvas.getContext("2d");
      if (ctx) {
        // Real Fold 8 Ultra Warm Cream/Olive wallpaper gradient
        const grad = ctx.createLinearGradient(0, 0, 512, 1024);
        grad.addColorStop(0, "#f3eedd");
        grad.addColorStop(0.5, "#dcd4b8");
        grad.addColorStop(1, "#a4b595");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 1024);

        // Bold "Galaxy Z Fold8 Ultra" typography
        ctx.fillStyle = "#1e2b22";
        ctx.font = "bold 52px sans-serif";
        ctx.textAlign = "center";
        ctx.save();
        ctx.translate(340, 600);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("Galaxy", 0, 0);
        ctx.fillText("Z Fold8 Ultra", 0, 60);
        ctx.restore();

        // Punch hole camera pin dot
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(256, 40, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      const texture = new THREE.CanvasTexture(texCanvas);
      texture.needsUpdate = true;
      return texture;
    };

    const innerTexture = createScreenTexture("Galaxy Z Fold8 Ultra");

    const coverScreenMat = new THREE.MeshBasicMaterial({ map: realTexture });
    const innerScreenMat = new THREE.MeshBasicMaterial({ map: innerTexture });

    // Wing Dimensions
    const w = 1.3;
    const h = 2.75;
    const d = 0.075;

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

    // Left Inner Screen
    const screenGeo = new THREE.PlaneGeometry(w - 0.04, h - 0.06);
    const leftScreen = new THREE.Mesh(screenGeo, innerScreenMat);
    leftScreen.position.set(0, 0, d / 2 + 0.002);
    leftMeshGroup.add(leftScreen);

    // Outer Back Panel of Left Wing (Forest Green Back + Triple Camera Module)
    const camHousingGeo = new THREE.BoxGeometry(0.38, 1.15, 0.07);
    const camHousing = new THREE.Mesh(camHousingGeo, bodyMat);
    camHousing.position.set(-w / 4, h / 4, -d / 2 - 0.035);
    leftMeshGroup.add(camHousing);

    // 3 Camera Lenses
    for (let i = 0; i < 3; i++) {
      const lensRing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.105, 0.105, 0.035, 24),
        hingeMat
      );
      lensRing.rotation.x = Math.PI / 2;
      lensRing.position.set(-w / 4, h / 4 + 0.35 - i * 0.35, -d / 2 - 0.07);
      leftMeshGroup.add(lensRing);

      const lensGlass = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.075, 0.037, 24),
        glassMat
      );
      lensGlass.rotation.x = Math.PI / 2;
      lensGlass.position.set(-w / 4, h / 4 + 0.35 - i * 0.35, -d / 2 - 0.072);
      leftMeshGroup.add(lensGlass);
    }

    // Flash dot
    const flashMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16),
      new THREE.MeshBasicMaterial({ color: 0xfffaed })
    );
    flashMesh.rotation.x = Math.PI / 2;
    flashMesh.position.set(-w / 4 + 0.26, h / 4 + 0.25, -d / 2 - 0.04);
    leftMeshGroup.add(flashMesh);

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

    // Right Inner Screen
    const rightScreen = new THREE.Mesh(screenGeo, innerScreenMat);
    rightScreen.position.set(0, 0, d / 2 + 0.002);
    rightMeshGroup.add(rightScreen);

    // Outer Cover Screen (using Real Uploaded Texture)
    const coverScreen = new THREE.Mesh(screenGeo, coverScreenMat);
    coverScreen.position.set(0, 0, -d / 2 - 0.002);
    coverScreen.rotation.y = Math.PI;
    rightMeshGroup.add(coverScreen);

    // --- Hinge Spine ---
    const hingeGeo = new THREE.CylinderGeometry(0.055, 0.055, h - 0.04, 32);
    const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
    hingeMesh.position.set(0, 0, 0);
    rootGroup.add(hingeMesh);

    // --- Shadow Plane ---
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const g = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(0, 0, 0, 0.5)");
      g.addColorStop(0.5, "rgba(0, 0, 0, 0.15)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = g;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.1;
    scene.add(shadowMesh);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isTabActive = true;

    const handleVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.clientWidth || 320;
      const nh = containerRef.current.clientHeight || 360;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    const cycleDuration = 14;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabActive) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Gentle Floating
      const floatY = Math.sin(time * 2) * 0.1;
      rootGroup.position.y = floatY;
      shadowMesh.scale.setScalar(1 - floatY * 0.12);

      // Rotation & Fold Cycle Progress
      const cycleProgress = (time % cycleDuration) / cycleDuration;
      const rotSpeed = hoverRef.current ? 0.25 : 1.0;
      rootGroup.rotation.y += delta * 0.45 * rotSpeed;

      let foldTarget = 0;
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

      const targetAngle = (1 - foldTarget) * (Math.PI / 2 - 0.05);

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

      rootGroup.rotation.x = Math.sin(time * 1.5) * 0.06;
      rootGroup.rotation.z = Math.cos(time * 1.2) * 0.03;

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
      className="relative flex flex-col items-center justify-center cursor-pointer select-none py-4 transition-transform duration-500 ease-out"
      style={{
        transform: isHovered ? "scale(1.04)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Galaxy Z Fold 8 Ultra Showcase"
    >
      {/* Soft Green/Blue Glow */}
      <div
        className="absolute inset-0 -z-10 rounded-full bg-emerald-500/15 blur-3xl transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.35 : 0.15,
          transform: "scale(1.3)",
        }}
      />

      {/* Floating Badge Tag */}
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-slate-950/90 px-3.5 py-1 text-xs font-semibold text-emerald-300 shadow-md backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
        Galaxy Z Fold 8 Ultra 3D
      </div>

      {/* 3D Canvas Container - Embedded Inline */}
      <div
        ref={containerRef}
        className="w-[280px] h-[320px] sm:w-[320px] sm:h-[360px] relative"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
