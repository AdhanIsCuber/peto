$("#modal-signup-btn").click(function () {
  $(".modal-signup").addClass("is-active");
});

$("#modal-postimage-1").click(function () {
  $(".modal-postimage-1").addClass("is-active");
});

$(".modal-close").click(function () {
  $(".modal").removeClass("is-active");
});

$(".btn-modal-close").click(function () {
  $(".modal").removeClass("is-active");
});

var file = document.getElementById("file");
file.onchange = function () {
  if (file.files.length > 0) {
    document.getElementById('filename').innerHTML = file.files[0].name;
  }
};

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#blah').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#file").change(function () {
  readURL(this);
});