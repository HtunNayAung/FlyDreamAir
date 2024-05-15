$(document).ready(function() {
    $('.logo').click(function() {
        window.location.href = 'index.html';
    });

    $('.hidden').hide();
    $("#departure").datepicker({
        minDate: 0
    });

    $("#return").datepicker({
        minDate: 0
    });

    $('input[type="radio"]').change(function() {
        if ($(this).val() === 'One Way') {
            $('#return').prop('disabled', true).val('N/A');
        } else {
            $('#return').prop('disabled', false).val('');
        }
    });


    $('#searchButton').click(function(event) {
        let needData = false;
        const origin = $('#origin').val();
        const destination = $('#destination').val();
        const departureDate = $('#departure').val();
        if(origin == "" || destination == "" || departureDate == ""){
            alert("Please fill all data");
            needData = true;
        }
        if(!needData){
            const count = $('#count').val();
            event.preventDefault();

            sessionStorage.setItem('flightQuery', JSON.stringify({
                origin: origin,
                destination: destination,
                departureDate: departureDate,
                count: count
            }));
            window.location.href = 'booking.html#flights';
        }
        
    });

    const tabs = $(".tab");
    const tabContents = $(".tab-content");
    tabs.click(function() {
        const tabName = $(this).data("tab");
        showTab(tabName);
        tabs.removeClass("active");
        $(this).addClass("active");
        history.pushState(null, null, `#${tabName}`);
    });

    function showTab(tabName) {
        tabContents.each(function() {
            if (this.id === tabName) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    function checkTicketValidity() {
        // Retrieve the ticketID from the input field
        var ticketID = $("#ticketID").val();
        
        // Check if the ticketID exists in localStorage
        let storedTickets = JSON.parse(localStorage.getItem('bookingsData')) || [];
        console.log(storedTickets)
        let isValidTicket = false;
        let foundTicket = null;
        for(let i=0; i<storedTickets.length;i++){
            for(let j=0; j<storedTickets[i].length; j++){
                console.log(storedTickets[i][j]['ticketID']);
                if(storedTickets[i][j]['ticketID'].includes(ticketID)){
                    isValidTicket = true;
                    foundTicket = storedTickets[i][j];
                    sessionStorage.setItem('foundTicket', JSON.stringify(foundTicket));
                }
            }
        }
        
        if (!isValidTicket) {
            $('#ticket-details-container').html(`<div id="ticket-details"><p><i class="ri-error-warning-line"></i> Invalid ticket ID. Please enter a valid ticket ID and try again.</p></div>`)
        } else {
            $('.trendings-container').css('top', '900px');
            let text =  `
            <div id="ticket-heading">
                BOOKING DETAILS
            </div>
            <div id="ticket-details">
            <p>${foundTicket['flight'].origin} To ${foundTicket['flight'].destination} (${foundTicket['flight'].flightNo})</p>
            <p>Name: ${foundTicket['personal'].title} ${foundTicket['personal'].firstName} ${foundTicket['personal'].lastName} </p><p> Seat: ${foundTicket.seat || 'No Seat Selected'}</p>
            <p>Departure: ${foundTicket['flight'].departure}</p>
            <button id="changeSeatBtn">Change Seat</button>
            </div>
            `
            
            $('#ticket-details-container').html(text);
            
            
            // sessionStorage.setItem('foundPassenger', passengerText);
            changeSeatBtnHandler();
        }
        let occupiedSeats = [];
        for(let i=0; i<storedTickets.length;i++){
            for(let j=0; j<storedTickets[i].length; j++){
                if(storedTickets[i][j]['flight'].origin.includes(foundTicket['flight'].origin) && storedTickets[i][j]['flight'].destination.includes(foundTicket['flight'].destination) && storedTickets[i][j]['flight'].departure.includes(foundTicket['flight'].departure)){
                    if(storedTickets[i][j]['seat'] === foundTicket['seat']){
                    } else{
                        occupiedSeats.push(storedTickets[i][j]['seat']);

                    }
                }
                
            }
        }
        sessionStorage.setItem('occupiedSeatInFlight', occupiedSeats);
    }


    $("#ticketSearchBtn").click(function() {
        checkTicketValidity(); 
    });
    
    // let passengerText = sessionStorage.getItem('foundPassenger');
    let foundTicket = JSON.parse(sessionStorage.getItem('foundTicket'));
    let passengerText = `
            <h4>${foundTicket['flight'].origin} <i class="ri-flight-takeoff-line"></i> ${foundTicket['flight'].destination}</h4>
            <div class="each-passenger-seat selected" data-passenger="${foundTicket['personal'].title} ${foundTicket['personal'].firstName} ${foundTicket['personal'].lastName}">
            
                <h5>${foundTicket['personal'].title} ${foundTicket['personal'].firstName} ${foundTicket['personal'].lastName}</h5>
                <p>Seat number: <span class="selected-seat-span">No seat selected</span></p>
            </div>
            `
   $('.seat-selection').append(passengerText);
    let occupiedSeats = sessionStorage.getItem('occupiedSeatInFlight').split(",");

    $('.seat').each(function() {
        let seatNumber = $(this).text().trim();

        for (let seat of occupiedSeats) {
            if(seat.trim() === seatNumber){
                $(this).addClass('confirmed');

            }

        }
    });

    
     
    let prevSelectedElement = null;
    $('.seat').click(function() {
        let booked = false;
        for (let seat of occupiedSeats) {
            if(seat.trim() === $(this).text()){
                alert("This seat is already booked");
                booked =true;
            }

        }
        if(!booked){
            const selectedSeatSpan = $('.selected-seat-span');
        
            // Remove 'selected' class from the previously selected seat
            if (prevSelectedElement !== null) {
                $(prevSelectedElement).removeClass('selected');
            }
            
            // Add 'selected' class to the clicked seat
            $(this).addClass('selected');
            prevSelectedElement = this;
            selectedSeatSpan.text($(this).text());
        }
        
    })

    $('.seat-selection').append(`<div class="proceed-btn-container-in-seat">
                <button class="btn" id="confirmSeatBtn">CONFIRM SEAT</button>
                <button class="btn" id="backBtn">BACK</button>
                </div>`);
    
    $('#backBtn').click(function(){
        window.location.href = "index.html"
    })
    $('#confirmSeatBtn').click(function(){
        if($('.selected-seat-span').text() === "No seat selected"){
            alert("Please choose a seat")
        } else{
            let storedTickets = JSON.parse(localStorage.getItem('bookingsData'));
            let foundIndex = { i: -1, j: -1 };
            for (let i = 0; i < storedTickets.length; i++) {
                for(let j=0; j<storedTickets[i].length; j++){
                    if (JSON.stringify(storedTickets[i][j]) === JSON.stringify(foundTicket)) {
                        foundIndex.i = i;
                        foundIndex.j = j;
                        break;
                    }
                }
                
            }
            if (foundIndex.i !== -1 && foundIndex.j !== -1) {
                storedTickets[foundIndex.i].splice(foundIndex.j, 1);
                console.log(storedTickets);
                if (storedTickets[foundIndex.i].length === 0) {
                    storedTickets.splice(foundIndex.i, 1); // Remove the entire sub-array
                }
                foundTicket['seat'] = $('.selected-seat-span').text();
                let foundTicketArray = [];
                foundTicketArray.push(foundTicket)
                storedTickets.push(foundTicketArray);
                console.log(storedTickets)
                localStorage.setItem('bookingsData', JSON.stringify(storedTickets));

                $('.seat-selection .proceed-btn-container-in-seat').remove();

                $('.seat-selection').append('<div id="success-text">Successfully updated. A confirmation mail is sent to your email. Thank you.</div>');

                $('.seat-selection').append(`<div class="proceed-btn-container-in-seat">
                    <button class="btn" id="backBtn">BACK</button>
                </div>`);

                $('#backBtn').click(function(){
                    window.location.href = "index.html";
                })
            }


        }
    })
    
});


function changeSeatBtnHandler(){
    $("#changeSeatBtn").click(function(event){
        event.preventDefault();
        window.location.href = "changeseat.html";    
    })
}


