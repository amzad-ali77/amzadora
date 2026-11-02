
    // PRODUCT IMAGE - FIXED
    const image = document.createElement("img");
    image.className = "product-image";
    image.alt = product.name;
    image.loading = "lazy";

    // Show fallback icon if image is missing
    function showFallback() {
      const fallback = document.createElement("i");
      fallback.className = "fa-solid " + product.icon + " product-fallback-icon";
      fallback.setAttribute("aria-hidden", "true");

      if (image.parentNode) {
        image.replaceWith(fallback);
      }
    }

    if (product.image && product.image.trim() !== "") {
      image.src = product.image;
      image.onerror = showFallback;
      art.append(tag, heart, image);
    } else {
      const fallback = document.createElement("i");
      fallback.className = "fa-solid " + product.icon + " product-fallback-icon";
      fallback.setAttribute("aria-hidden", "true");
      art.append(tag, heart, fallback);
    }
