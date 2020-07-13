document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
    openPhoto();

    function openPhoto() {
      document.querySelectorAll(".materialboxed").forEach(function(elm) {
        elm.addEventListener("click", function(event) {

        const materialbox = document.querySelector(".materialboxed");
        M.Materialbox.getInstance(materialbox).open();
    })
  })
}
  });

