    $(document).ready(function() {

        $('#slides').superslides({

            animation:'fade',
            play: 5000,
            pagination: false

        });

    });

    function openNav() {
        document.getElementById("myNav").style.height = "100%";
        document.getElementById("title").style.display = "none";
      }
      
      function closeNav() {
        document.getElementById("myNav").style.height = "0%";
        document.getElementById("title").style.display = "inline";

      }

      // function openCvPage() {
      //   window.open('cvpage.html', '_self');
      // }

      // document.getElementById('cvPagebutton').addEventListener('click',openCvPage);

      function openPage(pageName) {
        window.open(pageName, '_self');
      }
