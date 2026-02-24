"use client";

import { OrthographicCamera, useTexture } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useMemo, useEffect, useRef } from "react";

import { createQuadGeometry, useFluid } from "./fluid-simulation";
import * as THREE from "three";

export function ShaderEffect() {
  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black">
      <Canvas
        gl={{
          toneMapping: THREE.AgXToneMapping,
        }}
      >
        <OrthographicCamera
          makeDefault
          position={[0, 0, 1]}
          left={-0.5}
          right={0.5}
          top={0.5}
          bottom={-0.5}
          near={0.1}
          far={2}
        />
        <Scene />
      </Canvas>
    </div>
  );
}

function Scene() {
  const logo = useTexture("/m-logo.png") as THREE.Texture<HTMLImageElement>;

  const { density } = useFluid({
    densityDissipation: 0.94,
    curlStrength: 10,
    radius: 0.8,
  });
  const { size } = useThree();
  const materialRef = useRef<THREE.RawShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uDensity: { value: null },
      uLogo: { value: logo },
      uBackgroundColor: { value: new THREE.Color("black") },
      uForegroundColor: { value: new THREE.Color("#c02e28") },
      uLogoAspect: { value: 1 },
      uLogoSize: { value: new THREE.Vector2(1, 1) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // update changes
  uniforms.uLogo.value = logo;
  uniforms.uResolution.value.set(size.width, size.height);

  // Update density texture every frame
  useFrame(() => {
    if (materialRef.current && density.read.texture) {
      materialRef.current.uniforms.uDensity.value = density.read.texture;
    }
  });

  useEffect(() => {
    if (logo && logo.image) {
      uniforms.uLogoAspect.value = logo.image.width / logo.image.height;
      uniforms.uLogoSize.value.set(logo.image.width, logo.image.height);
    }
  }, [logo, uniforms]);

  return (
    <mesh geometry={quadGeometry}>
      <shaderMaterial
        toneMapped={false}
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

const vertexShader = /*glsl*/ `
  precision highp float;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0, 1);
  }
`;

const fragmentShader = /*glsl*/ `
  precision highp float;
  uniform sampler2D uDensity;
  uniform sampler2D uLogo;
  uniform vec3 uBackgroundColor;
  uniform vec3 uForegroundColor;
  uniform float uLogoAspect;
  uniform vec2 uLogoSize;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Calculate aspect ratios
    float screenAspect = uResolution.x / uResolution.y;
    float logoAspect = uLogoAspect;
    
    // Calculate scale to contain the screen
    float scaleToContain;
    if (screenAspect > logoAspect) {
      // Screen is wider than logo, fit to height
      scaleToContain = uResolution.y;
    } else {
      // Screen is taller than logo, fit to width
      scaleToContain = uResolution.x / logoAspect;
    }
    
    // Calculate the resulting pixel size on screen
    vec2 logoSizeOnScreen = vec2(
      scaleToContain * logoAspect,
      scaleToContain
    );
    
    // Clamp scale if it would exceed actual logo pixel size
    float scaleX = min(1.0, uLogoSize.x / logoSizeOnScreen.x);
    float scaleY = min(1.0, uLogoSize.y / logoSizeOnScreen.y);
    float finalScale = min(scaleX, scaleY);
    
    // Apply the clamped scale
    vec2 finalLogoSize = logoSizeOnScreen * finalScale;
    
    // Calculate centered logo UV coordinates with clamped size
    vec2 logoUV = uv;
    float logoWidth = finalLogoSize.x / uResolution.x;
    float logoHeight = finalLogoSize.y / uResolution.y;
    
    float offsetX = (1.0 - logoWidth) * 0.5;
    float offsetY = (1.0 - logoHeight) * 0.5;
    
    logoUV.x = (uv.x - offsetX) / logoWidth;
    logoUV.y = (uv.y - offsetY) / logoHeight;
    
    // Sample logo texture
    vec4 logoColor = texture2D(uLogo, logoUV);
    float logoMask = logoColor.r; // Use red channel as mask (assuming grayscale)
    
    // Determine if we're inside or outside the logo bounds
    bool insideLogo = logoUV.x >= 0.0 && logoUV.x <= 1.0 && logoUV.y >= 0.0 && logoUV.y <= 1.0;
    
    // Base color: white parts = foreground, black parts = background
    vec3 baseColor = mix(uBackgroundColor, uForegroundColor, logoMask);
    
    // If outside logo bounds, use background color
    if (!insideLogo) {
      baseColor = uBackgroundColor;
    }
    
    // Sample fluid density
    vec3 fluid = texture2D(uDensity, uv).rgb;
    fluid = vec3(length(fluid));
    
    vec3 fluidHighlight = fluid * 0.1 * logoMask; // Adjust intensity
    vec3 finalColor = baseColor * (1. + fluidHighlight.r);
    
    // Clamp to prevent oversaturation
    finalColor = clamp(finalColor, 0.0, 1.0);
    
    gl_FragColor = vec4(finalColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const quadGeometry = createQuadGeometry();
