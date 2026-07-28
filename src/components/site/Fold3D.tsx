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

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
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

    // --- Procedural Textures with SAMSUNG Text & Digital Signs ---
    const createScreenTexture = (type: "cover" | "inner_left" | "inner_right") => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 512;
      texCanvas.height = 1024;
      const ctx = texCanvas.getContext("2d");
      if (ctx) {
        // Deep Dark AMOLED Background
        const grad = ctx.createLinearGradient(0, 0, 512, 1024);
        grad.addColorStop(0, "#05070a");
        grad.addColorStop(0.5, "#0b1220");
        grad.addColorStop(1, "#030406");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 1024);

        if (type === "cover") {
          // Cover Display Screen: Bold SAMSUNG logo + Digital Signs
          ctx.fillStyle = "#ffffff";
          ctx.font = "900 48px sans-serif";
          ctx.textAlign = "center";
          ctx.letterSpacing = "6px";
          ctx.fillText("SAMSUNG", 256, 280);

          // Subtitle / Sign
          ctx.fillStyle = "#3b82f6";
          ctx.font = "bold 22px sans-serif";
          ctx.letterSpacing = "2px";
          ctx.fillText("GALAXY Z FOLD", 256, 330);

          // Digital Clock & Status Signs
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 72px sans-serif";
          ctx.fillText("10:08", 256, 480);

          ctx.fillStyle = "#94a3b8";
          ctx.font = "16px sans-serif";
          ctx.fillText("Mon, Jul 28  ·  100% ⚡", 256, 520);

          // Accent glowing line
          ctx.fillStyle = "#3b82f6";
          ctx.fillRect(156, 570, 200, 3);
        } else if (type === "inner_left") {
          // Left Main Screen: SAMSUNG Logo
          ctx.fillStyle = "#ffffff";
          ctx.font = "900 52px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("SAMSUNG", 256, 480);

          ctx.fillStyle = "#60a5fa";
          ctx.font = "bold 24px sans-serif";
          ctx.fillText("AI Foldable", 256, 530);
        } else {
          // Right Main Screen: GALAXY Z FOLD Text
          ctx.fillStyle = "#ffffff";
          ctx.font = "900 44px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("GALAXY Z FOLD", 256, 480);

          ctx.fillStyle = "#94a3b8";
          ctx.font = "18px sans-serif";
          ctx.fillText("Next-Gen Display", 256, 530);
        }
      }
      const texture = new THREE.CanvasTexture(texCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      return texture;
    };

    const coverTex = createScreenTexture("cover");
    const innerLeftTex = createScreenTexture("inner_left");
    const innerRightTex = createScreenTexture("inner_right");

    // Pearl White Body & Polished Silver Metallic Hinge Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf5f7fa, // Pearl White / Titanium White
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

    const coverScreenMat = new THREE.MeshBasicMaterial({ map: coverTex });
    const innerLeftScreenMat = new THREE.MeshBasicMaterial({ map: innerLeftTex });
    const innerRightScreenMat = new THREE.MeshBasicMaterial({ map: innerRightTex });

    // Wing Dimensions
    const w = 1.25;
    const h = 2.65;
    const d = 0.07;

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

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

    // Left Inner Display (+Z face)
    const screenGeo = new THREE.PlaneGeometry(w - 0.05, h - 0.06);
    const leftInnerScreen = new THREE.Mesh(screenGeo, innerLeftScreenMat);
    leftInnerScreen.position.set(0, 0, d / 2 + 0.002);
    leftMeshGroup.add(leftInnerScreen);

    // Outer Back Panel of Left Wing (-Z face): Triple Camera Module
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

    // Right Inner Display (+Z face)
    const rightInnerScreen = new THREE.Mesh(screenGeo, innerRightScreenMat);
    rightInnerScreen.position.set(0, 0, d / 2 + 0.002);
    rightMeshGroup.add(rightInnerScreen);

    // Outer Cover Screen (-Z face): Shows SAMSUNG Text & Digital Signs
    const coverScreenMesh = new THREE.Mesh(screenGeo, coverScreenMat);
    coverScreenMesh.position.set(0, 0, -d / 2 - 0.002);
    coverScreenMesh.rotation.y = Math.PI;
    rightMeshGroup.add(coverScreenMesh);

    // --- Hinge Spine ---
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

    // --- Animation Timeline Controller ---
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

    const cycleDuration = 9.0; // 9 seconds full cycle

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabActive) return;

      const time = clock.getElapsedTime();
      const progress = (time % cycleDuration) / cycleDuration; // 0.0 to 1.0

      // SEQUENCE PHASES:
      // 1. (0.0 -> 0.25): Closed phone (back view with camera module & hinge)
      // 2. (0.25 -> 0.55): Unfolds open showing SAMSUNG text on main inner screen (+Z face)
      // 3. (0.55 -> 0.82): Pivots to show unfolded back view (one side camera module, other side Cover Screen displaying SAMSUNG text & digital signs)
      // 4. (0.82 -> 1.00): Smoothly closes back to closed state

      let foldAngle = Math.PI - 0.05; // Closed wing angle
      let rootRotY = 0; // Front vs back pivot

      if (progress < 0.25) {
        // Phase 1: Closed Phone (Back view showing camera module & spine)
        foldAngle = Math.PI - 0.05;
        rootRotY = Math.PI; // Show back
      } else if (progress >= 0.25 && progress < 0.55) {
        // Phase 2: Unfolding open to 180° flat showing SAMSUNG main inner screen
        const p = (progress - 0.25) / 0.3;
        const eased = THREE.MathUtils.smoothstep(p, 0, 1);
        foldAngle = THREE.MathUtils.lerp(Math.PI - 0.05, 0.02, eased);
        rootRotY = THREE.MathUtils.lerp(Math.PI, 0, eased); // Rotate to front
      } else if (progress >= 0.55 && progress < 0.82) {
        // Phase 3: Pivot to Unfolded Back View (one side camera module, other side Cover display screen with SAMSUNG text & signs)
        const p = (progress - 0.55) / 0.27;
        const eased = THREE.MathUtils.smoothstep(p, 0, 1);
        foldAngle = 0.02; // Stays unfolded 180°
        rootRotY = THREE.MathUtils.lerp(0, Math.PI, eased); // Rotate to back view
      } else {
        // Phase 4: Smoothly folds back closed
        const p = (progress - 0.82) / 0.18;
        const eased = THREE.MathUtils.smoothstep(p, 0, 1);
        foldAngle = THREE.MathUtils.lerp(0.02, Math.PI - 0.05, eased);
        rootRotY = Math.PI;
      }

      // Apply wing angles & root orientation
      leftWingGroup.rotation.y = foldAngle / 2;
      rightWingGroup.rotation.y = -foldAngle / 2;
      rootGroup.rotation.y = rootRotY;

      // Gentle floating
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
      {/* WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-[200px] h-[240px] sm:w-[240px] sm:h-[280px] lg:w-[270px] lg:h-[310px] relative"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
