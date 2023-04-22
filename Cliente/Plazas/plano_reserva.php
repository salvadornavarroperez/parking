<!DOCTYPE html>
<html>
  <head>
    <title>Area de reserva</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <style>
      .btn-outline-success:hover {
      background-color: gray;
      }
      .parking-lot-container {
        padding:  5%;
        margin: 0 auto;
        width: 75%;
      }
      .parking-spot {
        width: 50px;
        height: 25px;
        margin-right: 5px;
        border: 1px solid #e9ecef;
        color:black;
        font-size:10px;
      }
      .parking-street {
        width: 60px;
        height: 25px;
        margin-right: 5px;
        background-color: lightgray;
      }
      .libre{
        background-color: green;
      }
      .ocupada{
        background-color: red;
        pointer-events: none;
      }
      .marcado{
      -webkit-animation: blinker 1s linear infinite;
      animation: blinker 1s linear infinite;
      }

      @-webkit-keyframes blinker {  
        50% { opacity: 0; }
      }

      @keyframes blinker {  
        50% { opacity: 0; }
      }
    </style>
  </head>
  <body>
    <div class="parking-lot-container">
      <div class="d-flex flex-wrap align-content-start" id= 'plano'>
        <?php
        for ($i=0; $i<204; $i++) {
          if ($i % 12 == 0) {
            echo '<div class="d-flex flex-nowrap">';
          }
          if ($i % 2 == 0) {
            echo '<button class="parking-spot btn btn-outline-success" id= '.($i+1).'>'.($i+1).'</button>';
          } else {
            echo '<div class="parking-street text-secondary"></div>';
            echo '<button class="parking-spot btn btn-outline-success" id= '.($i+1).'>'.($i+1).'</button>';
          }
          if ($i % 12 == 11) {
            echo '</div>';
          }
        }
        ?>
      </div>
    </div>
    <div class="text-center">
    <input type="button" value="Reservar" id="reservar" class="btn btn-primary">
    </div>
    <script type="module" defer src="Plazas/plano_reserva.js"></script>
  </body>
</html>