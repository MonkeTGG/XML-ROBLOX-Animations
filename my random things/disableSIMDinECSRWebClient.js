// force-disable SIMD globally
if (typeof WebAssembly === "object") {
  WebAssembly.validate = ((orig) => (bytes) => {
    // block SIMD by always saying "nope"
    try {
      if (bytes.includes(0xfd)) { // SIMD opcodes start with 0xfd
        return false;
      }
    } catch (e) {}
    return orig(bytes);
  })(WebAssembly.validate);
}

console.log("🚫 SIMD disabled for this page");
