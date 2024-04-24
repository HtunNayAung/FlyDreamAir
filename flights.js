const options = { 
    year: 'numeric', 
    month: 'short', 
    day: '2-digit', 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
};

$(document).ready(function() {
    $('.logo').click(function() {
        window.location.href = 'index.html';
    });
    const urlParams = new URLSearchParams(window.location.search);

    const origin = capitalize(urlParams.get('origin'));
    const destination = capitalize(urlParams.get('destination'));
    const departureDate = new Date(decodeURIComponent(urlParams.get('departureDate')));
    $('#flight-heading').html(` ${origin} <i class="ri-flight-takeoff-line"></i> ${destination}`);
    

   fetchFlightData(origin, destination).then(function(flights){
        if(flights.length == 0){
            const text = `<div class="no-flight-message">
                            <h1>No available flights between ${origin} and ${destination}</h1>
                        </div>`
            $('body').append(text);
        } else{
            flights.forEach(flight => {
                const departureTime =  flight.departureTime;
                const [timeStr, ampm] = departureTime.split(" ");
                const [hoursStr, minutesStr] = timeStr.split(":");

                let hours = parseInt(hoursStr, 10);
                const minutes = parseInt(minutesStr, 10);
                if (ampm.toLowerCase() === "pm" && hours < 12) {
                    hours += 12;
                }

                departureDate.setHours(hours);
                departureDate.setMinutes(minutes);
    
    
                
                const duration = flight.duration;
                const arrivalDate = new Date(departureDate.getTime() + duration * 60 * 60 * 1000).toLocaleString('en-US',options);
                const text = `<div class="flight-details-container">
                                <div class="flight-details">
                                    <div class="flight-details-row">
                                        <div class="detail row1">
                                            ${origin}
                                        </div>
                                        <div class="detail row1">
                                            -------<span>&#9992;</span>------
                                        </div>
                                        <div class="detail row1">
                                            ${destination}
                                        </div>
                                        <div class="detail row1">
                                            ${flight.price} AUD
                                        </div>
                                        <div class="detail row1 buttonCell">
                                            <button class="btn" id="selectBtn">Select</button>
                                        </div>
                                    </div>
                                    <div class="flight-details-row">
                                        <div class="detail row2">
                                            ${departureDate.toLocaleString('en-US',options)}
                                        </div>
                                        <div class="detail row2">
                                            
                                        </div>
                                        <div class="detail row2">
                                            ${arrivalDate}
                                        </div>
                                        <div class="detail row2">
                                            ${flight.flightNo?flight.flightNo:"Flight Number N/A"}
                                        </div>
                                        <div class="detail row2">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>`
                $('body').append(text);
            });

            $('body').append(`<div class="proceed-btn-container">
            <button class="btn" id="proceedBtn">Proceed</button>
        </div>`)
            let selectedFlight = null;

            $('.btn').click(function() {
            
            const flightIndex = $(this).closest('.flight-details-container').index() - 5;
            
            $('.flight-details-container').removeClass('selected');
            var container = $(this).closest('.flight-details-container');
            container.addClass('selected');
    
            selectedFlight = flights[flightIndex];
            
            console.log(selectedFlight);
    });

        }
        
        
   })


   

});


function fetchFlightData(origin, destination) {
    return fetch('flights_info.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data['flights'].filter(flight => flight.departureCity === origin && flight.destinationCity === destination);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function capitalize(string) {
    return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
