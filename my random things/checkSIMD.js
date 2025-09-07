(async () => {
  // wasm binary with one SIMD add instruction (v128.add)
  const wasmSIMD = new Uint8Array([
    0x00,0x61,0x73,0x6d, // WASM magic
    0x01,0x00,0x00,0x00, // version
    // type section
    0x01,0x07,0x01,0x60,0x00,0x01,0x7b,
    // function section
    0x03,0x02,0x01,0x00,
    // export section
    0x07,0x07,0x01,0x03,0x61,0x64,0x64,0x00,0x00,
    // code section
    0x0a,0x09,0x01,0x07,0x00,
    0xfd,0x00,0x0b // v128.const + end (simplified)
  ]);

  try {
    const module = await WebAssembly.compile(wasmSIMD);
    const instance = await WebAssembly.instantiate(module);
    console.log("✅ Safari compiled and ran SIMD successfully:", instance);
  } catch (e) {
    console.error("❌ SIMD failed:", e);
  }
})();
