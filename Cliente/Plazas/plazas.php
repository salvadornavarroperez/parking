<!DOCTYPE html>
<html>
  <head>
    <title>Parking Reservation System</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <style>
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
      }
      .parking-street {
        width: 60px;
        height: 25px;
        margin-right: 5px;
        background-color: lightgray;
      }
    </style>
  </head>
  <body>
    <div class="parking-lot-container">
      <div class="d-flex flex-wrap align-content-start">
        <?php
        for ($i=0; $i<204; $i++) {
          if ($i % 12 == 0) {
            echo '<div class="d-flex flex-nowrap">';
          }
          if ($i % 2 == 0) {
            echo '<button class="parking-spot btn btn-outline-success" onclick="reserveSpot('.$i.')"></button>';
          } else {
            echo '<div class="parking-street text-secondary"></div>';
            echo '<button class="parking-spot btn btn-outline-success" onclick="reserveSpot('.$i.')"></button>';
          }
          if ($i % 12 == 11) {
            echo '</div>';
          }
        }
        ?>
      </div>
    </div>
    <div>
    <input type="button" value="Reserve Spot" onclick="submitReservation()" />
    </div>
    <script>
      let selectedSpot;
      let customerId = localStorage.getItem('customerId');
      function reserveSpot(spotNumber) {
        let spot = document.querySelectorAll('.parking-spot')[spotNumber];
        if (spot.classList.contains('btn-outline-success')) {
          // Spot is available
          spot.classList.remove('btn-outline-success');
          spot.classList.add('btn-outline-danger');
          selectedSpot = spotNumber;
          alert('Spot #' + spotNumber + ' has been selected!');
        } else {
          // Spot is unavailable
          alert('Spot #' + spotNumber + ' is already reserved!');
        }
      }

      function submitReservation() {
        let request = new XMLHttpRequest();
        request.open('POST', 'https://example.com/reserve');
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function () {
          let response = JSON.parse(request.responseText);
          if (response.status === 'success') {
            alert('Spot #' + selectedSpot + ' has been reserved!');
          } else {
            alert('There was an error reserving this spot!');
          }
        };
        let data = {
          spotNumber: selectedSpot,
          customerId: customerId
        };
        request.send(JSON.stringify(data));
      }
    </script>
  </body>
</html>