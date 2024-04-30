const options = { 
    year: 'numeric', 
    month: 'short', 
    day: '2-digit', 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
};


const nationalities = [
    "Afghan",
    "Albanian",
    "Algerian",
    "American",
    "Andorran",
    "Angolan",
    "Antiguans",
    "Argentinean",
    "Armenian",
    "Australian",
    "Austrian",
    "Azerbaijani",
    "Bahamian",
    "Bahraini",
    "Bangladeshi",
    "Barbadian",
    "Barbudans",
    "Batswana",
    "Belarusian",
    "Belgian",
    "Belizean",
    "Beninese",
    "Bhutanese",
    "Bolivian",
    "Bosnian",
    "Brazilian",
    "British",
    "Bruneian",
    "Bulgarian",
    "Burkinabe",
    "Burmese",
    "Burundian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Cape Verdean",
    "Central African",
    "Chadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Comoran",
    "Congolese",
    "Costa Rican",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Djibouti",
    "Dominican",
    "Dutch",
    "East Timorese",
    "Ecuadorean",
    "Egyptian",
    "Emirian",
    "Equatorial Guinean",
    "Eritrean",
    "Estonian",
    "Ethiopian",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Gabonese",
    "Gambian",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Grenadian",
    "Guatemalan",
    "Guinea-Bissauan",
    "Guinean",
    "Guyanese",
    "Haitian",
    "Herzegovinian",
    "Honduran",
    "Hungarian",
    "I-Kiribati",
    "Icelander",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakhstani",
    "Kenyan",
    "Kittian and Nevisian",
    "Kuwaiti",
    "Kyrgyz",
    "Laotian",
    "Latvian",
    "Lebanese",
    "Liberian",
    "Libyan",
    "Liechtensteiner",
    "Lithuanian",
    "Luxembourger",
    "Macedonian",
    "Malagasy",
    "Malawian",
    "Malaysian",
    "Maldivian",
    "Malian",
    "Maltese",
    "Marshallese",
    "Mauritanian",
    "Mauritian",
    "Mexican",
    "Micronesian",
    "Moldovan",
    "Monacan",
    "Mongolian",
    "Moroccan",
    "Mosotho",
    "Motswana",
    "Mozambican",
    "Namibian",
    "Nauruan",
    "Nepalese",
    "New Zealander",
    "Nicaraguan",
    "Nigerian",
    "Nigerien",
    "North Korean",
    "Northern Irish",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palauan",
    "Panamanian",
    "Papua New Guinean",
    "Paraguayan",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saint Lucian",
    "Salvadoran",
    "Samoan",
    "San Marinese",
    "Sao Tomean",
    "Saudi",
    "Scottish",
    "Senegalese",
    "Serbian",
    "Seychellois",
    "Sierra Leonean",
    "Singaporean",
    "Slovakian",
    "Slovenian",
    "Solomon Islander",
    "Somali",
    "South African",
    "South Korean",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Surinamer",
    "Swazi",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tajik",
    "Tanzanian",
    "Thai",
    "Togolese",
    "Tongan",
    "Trinidadian or Tobagonian",
    "Tunisian",
    "Turkish",
    "Tuvaluan",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbekistani",
    "Venezuelan",
    "Vietnamese",
    "Welsh",
    "Yemenite",
    "Zambian",
    "Zimbabwean"
  ];


const menuItems = [
    { name: 'Sandwich', price: 12, image: 'images/sandwich.jpeg' },
    { name: 'Seafood Pasta', price: 19, image: 'images/pasta.jpeg' },
    { name: 'Coconut Rice', price: 16, image: 'images/coconut_rice.jpeg' },
    { name: 'Beef Salad', price: 19, image: 'images/beef_salad.jpeg' },
    { name: 'Noodle Soup', price: 15, image: 'images/noodle_sopu.jpeg' },
    { name: 'Salmon Sushi', price: 11, image: 'images/sushi.jpeg' },
    { name: 'Pad Thai', price: 13, image: 'images/padThai.jpeg' },
    { name: 'Fried Chicken', price: 16, image: 'images/fried_chic.jpeg' },
    { name: 'Orange Juice', price: 9, image: 'images/orange.jpeg' },
    { name: 'Apple Juice', price: 9, image: 'images/apple.jpeg' },
    { name: 'Lemon Juice', price: 9, image: 'images/lemon.jpeg' },
    { name: 'Kiwi Juice', price: 9, image: 'images/kiwi.jpeg' }

];
  



$(document).ready(function() {
    $('.logo').click(function() {
        window.location.href = 'index.html';
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

    $(window).on("popstate", function(event) {
        const tabName = location.hash.slice(1);
        showTab(tabName);
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

    // Initial tab display based on hash fragment
    const initialTab = location.hash.slice(1);
    showTab(initialTab);


    const flightQueryJson = sessionStorage.getItem('flightQuery');
    if(flightQueryJson) {
        const flightData = JSON.parse(flightQueryJson);
        const origin = capitalize(flightData.origin);
        const destination = capitalize(flightData.destination);
        const departureDate = new Date(flightData.departureDate);
        const count = parseInt(flightData.count);
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
                                                <button class="btn selectButtons" id="selectBtn">Select</button>
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
                    $('#flights').append(text);
                });
    
                $('#flights').append(`<div class="proceed-btn-container">
                                    <button class="btn" id="proceedBtn">PROCEED</button>
                                 </div>`)
    
                $('.selectButtons').click(function() {
                    $('.flight-details-container').removeClass('selected');
                    var container = $(this).closest('.flight-details-container');
                    container.addClass('selected');
                });
    
                $('#proceedBtn').click(function(){
                    var selectedFlight = $('.flight-details-container.selected');
                    if (selectedFlight.length > 0) {
                        // Retrieve flight data from the selected flight details container
                        var flightData = {
                            origin: capitalize(selectedFlight.find('.row1:eq(0)').text().trim()),
                            destination: capitalize(selectedFlight.find('.row1:eq(2)').text().trim()),
                            departure: selectedFlight.find('.row2:eq(0)').text().trim(),
                            arrival: selectedFlight.find('.row2:eq(2)').text().trim(),
                            price: selectedFlight.find('.row1:eq(3)').text().trim(),
                            flightNo: selectedFlight.find('.row2:eq(3)').text().trim()
                        };

                        window.location.hash = "passengers";
                        tabs.removeClass("active");
                        $(".booking-nav span[data-tab='passengers']").addClass("active");

                        // // Store flight data in session storage
                        sessionStorage.setItem('selectedFlight', JSON.stringify(flightData));
                    } else{
                        alert("Please select a flight.");
                    }
    
            });
    
    
            };
        })

        for(let i=0; i<count; i++){
            const passengerText = `<div class="passenger-data-container">
            <div class="passenger-heading">
                <div> <span><i class="ri-user-line"></i></span>  Passenger ${i+1}</div>
            </div>
            <div class="personal-details">
                <h4>Personal details</h4>

                <div class="personal-details-row">
                    <div class="input-group" id="title-group">
                        <input type="text" id="title" name="title">
                        <label for="title">Title</label>
                    </div>
                    <div class="input-group">
                        <input type="text" id="firstName" name="firstName">
                        <label for="firstName">First Name (as in passport)</label>
                    </div>
                    <div class="input-group">
                        <input type="text" id="lastName" name="lastName">
                        <label for="lastName">Last Name (as in passport)</label>
                    </div>
                </div>

                <div class="personal-details-row" id="personal-second-row">
                        <div class="input-group nationality-container">
                            <div class="dropdown">
                                <label for="nationality">Nationality</label>
                                <button class="dropbtn">Select Nationality</button>
                                <div class="dropdown-content" id="nationalityList"></div>
                            </div> 
                        </div>

                        <div class="input-group passport-container">
                            <input type="text" id="passport" name="passport">
                            <label for="passport">Passport Number</label>
                        </div>

                        <div class="input-group passport-container">
                            <input type="text" id="issue-place" name="issue-place">
                            <label for="issue-place">Issuing Country</label>
                        </div>

                        <div class="input-group passport-container">
                            <input type="text" id="expiry" name="expiry">
                            <label for="expiry">Expiry Date</label>
                        </div>
                </div>
            </div>
            <div class="contact-details">
                <h4>Contact details</h4>
                <div class="contact-details-row">
                    <div class="input-group email-container">
                        <input type="email" id="email" name="email">
                        <label for="email">Email</label>
                    </div>

                    <div class="input-group ph-num-container">
                        <input type="tel" id="phone-number" name="phone-number">
                        <label for="phone-number">Phone Number</label>
                    </div>
                </div>
            </div>
            
        </div>`;

        $('#passengers').append(passengerText);
        }

        
    }; 

    $('#passengers').append(`<div class="proceed-btn-container">
                                <button class="btn" id="nextBtn">NEXT: SEAT SELECTION</button>
                                <button class="btn" id="toPaymentBtn">STRAIGHT TO PAYMENT</button>
                            </div>`);

    $(document).on('click', '.dropbtn', function() {
        populateDropdown(this);
    });

    $('#nextBtn').click(function(){
        savePassengerData();
        window.location.hash = "seats";
        tabs.removeClass("active");
        $(".booking-nav span[data-tab='seats']").addClass("active");
    });

    $('#toPaymentBtn').click(function(){
        savePassengerData();
        window.location.hash = "payment";
        tabs.removeClass("active");
        $(".booking-nav span[data-tab='payment']").addClass("active");
    });

    let flight = JSON.parse(sessionStorage.getItem('selectedFlight'));
    let passengersData = JSON.parse(sessionStorage.getItem('passengerData'));
    let seatSelectionText = `
    <h4>${flight.origin} <i class="ri-flight-takeoff-line"></i> ${flight.destination}</h4>`

    for(let i=0; i<passengersData.length; i++){
        let fullName = passengersData[i]['personal'].title + ' ' + passengersData[i]['personal'].firstName + ' ' + passengersData[i]['personal'].lastName;
        seatSelectionText += `<div class="each-passenger-seat" data-passenger="${fullName}">
        
        <h5>${fullName}</h5>
        <p>Seat number: <span class="selected-seat-span">No seat selected</span></p>
    </div>`;
    }

    $('.seat-selection').append(seatSelectionText);

    const passengerSeats = {};
    const confirmedSeats = new Map(); // Map to store confirmed seats for each passenger
    const selectedSeats = {}; // Object to store selected seats for each passenger
    const finished = {};

    const passengers = document.querySelectorAll('.each-passenger-seat');

    // Event listener for passenger selection
    

    // Function to update selected seat for a passenger
    function updateSelectedSeat(passenger, seatNumber) {
        const passengerElement = document.querySelector(`.each-passenger-seat[data-passenger="${passenger}"]`);
        if (passengerElement) {
            const selectedSeatSpanElement = passengerElement.querySelector('.selected-seat-span');
            if (selectedSeatSpanElement) {
                selectedSeatSpanElement.textContent = seatNumber;
            }
        }
        passengerSeats[passenger] = seatNumber;
    }

    function findSeatContainer(seatNumber) {
        const seats = document.querySelectorAll('.seat');
        let seatContainer = null;
    
        seats.forEach(seat => {
            if (seat.textContent.trim() === seatNumber) {
                seatContainer = seat;
                return; // Exit the loop once the seat is found
            }
        });
    
        return seatContainer;
    }

    // Function to show confirmation box for seat selection
    function showConfirmationBox(passenger, seatNumber) {
        const confirmationBox = document.createElement('div');
        confirmationBox.innerHTML = `
            <p>Confirm seat ${seatNumber} for ${passenger}?</p>
            <button class="confirmSeatBtn">CONFIRM SEAT</button>
        `;
        confirmationBox.classList.add('confirmation-box');
        // document.body.appendChild(confirmationBox);
        
        $(`.each-passenger-seat[data-passenger="${passenger}"]`).append(confirmationBox);

        const confirmSeatBtn = confirmationBox.querySelector('.confirmSeatBtn');
        confirmSeatBtn.addEventListener('click', function() {
            // document.body.removeChild(confirmationBox);
            $('.seat-selection .confirmation-box').remove();
            if(finished[passenger]!=null){
                finished[passenger].classList.remove('confirmed')
            }
            const selectedSeat = selectedSeats[passenger];
            if (selectedSeat) {
                selectedSeat.classList.add('confirmed');
                confirmedSeats.set(passenger, seatNumber); 
                finished[passenger] = findSeatContainer(seatNumber);
            }
        });
    }

    

    // Event listener for seat selection
    const seats = document.querySelectorAll('.seat');
    seats.forEach(seat => {
        seat.addEventListener('click', function() {
            const selectedPassenger = document.querySelector('.each-passenger-seat.selected');
            if (selectedPassenger) {
                const passengerName = selectedPassenger.dataset.passenger;
                const seatNumber = seat.textContent;;
                // Check if seat is already confirmed
                if (!isSeatNumberExists(confirmedSeats, seatNumber)) {
                    // Remove 'selected' class from previously selected seat
                    const prevSelectedSeat = selectedSeats[passengerName];
                    if (prevSelectedSeat) {
                        const confirmationBox = document.querySelector('.confirmation-box');
                        if (confirmationBox) {
                            confirmationBox.remove();
                        }
                        prevSelectedSeat.classList.remove('selected');
                    }
    
                    // Update selected seat for the passenger
                    updateSelectedSeat(passengerName, seatNumber);
                    selectedSeats[passengerName] = seat;
                    seat.classList.add('selected');
                    showConfirmationBox(passengerName, seatNumber);
    
                    // // Reload the page
                    // location.reload();
                } else {
                    alert('Seat already confirmed. Please choose another seat.');
                }
            }
        });
    });

    passengers.forEach(passenger => {
        passenger.addEventListener('click', function() {
            passengers.forEach(p => p.classList.remove('selected'));
            this.classList.add('selected');
        });
    });



    $('.seat-selection').append(`<div class="proceed-btn-container-in-seat">
                                <button class="btn" id="nextAddOnsBtn">NEXT: ADD-ONS</button>
                                <button class="btn" id="toPaymentBtnSeat">SKIP TO PAYMENT</button>
                            </div>`);

    
    $('#toPaymentBtnSeat').click(function(){
        sessionStorage.setItem('seatConfirmed',JSON.stringify(Array.from(confirmedSeats).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {})));
        window.location.hash = "payment";
        tabs.removeClass("active");
        $(".booking-nav span[data-tab='payment']").addClass("active");
    });

    $('#nextAddOnsBtn').click(function(){
        sessionStorage.setItem('seatConfirmed',JSON.stringify(Array.from(confirmedSeats).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {})));
        window.location.hash = "addons";
        tabs.removeClass("active");
        $(".booking-nav span[data-tab='addons']").addClass("active");
    });

    const menuContainer = document.querySelector('.menus');
    menuItems.forEach(item => {
        const menuItem = createMenuItem(item);
        menuContainer.appendChild(menuItem);
    });

    let seatConfirmed = JSON.parse(sessionStorage.getItem('seatConfirmed'));
    let flightHeading = `
    <h4>${flight.origin} <i class="ri-flight-takeoff-line"></i> ${flight.destination}</h4>`;

    for(let i=0; i<passengersData.length; i++){
        let fullName = passengersData[i]['personal'].title + ' ' + passengersData[i]['personal'].firstName + ' ' + passengersData[i]['personal'].lastName;
        flightHeading += `<div class="each-passenger-order" data-passenger="${fullName}">
            <h5>${fullName} <span> Seat Number: ${seatConfirmed[fullName]} </span></h5>
            <div class="orders"></div>
            <button class="orderBtn">Add Order</button>
        </div>`;
    }


    $('.order-container').append(flightHeading);

    $('.order-container').append(`<div class="proceed-btn-container-in-addon">
                                <button class="btn" id="toPaymentBtnAddon">PROCEED TO PAYMENT</button>
                            </div>`);

    $(document).on('click', '.orderBtn', function() {
        // Find the parent .each-passenger-order container
        let passengerContainer = $(this).closest('.each-passenger-order');
        // Get the passenger's full name from the data-passenger attribute
        let passengerName = passengerContainer.attr('data-passenger');
    
        // Create a dropdown box for the menu items
        let dropdown = $('<select class="menu-dropdown">');
        // Append an empty option indicating no selection
        dropdown.append($('<option>').text('Select item'));
        // Append options for each menu item
        // Assuming menuItems is an array containing the available menu items
        menuItems.forEach(function(item) {
            dropdown.append($('<option>').text(item.name));
        });
    
        // Append the dropdown box to the .orders container inside the passenger container
        passengerContainer.find('.orders').append(dropdown);
    });
    
    $('#toPaymentBtnAddon').click(function(){
        let orderedItems = {};

        // Iterate over each passenger container
        $('.each-passenger-order').each(function() {
            // Get the passenger's full name
            let passengerName = $(this).attr('data-passenger');
            // Get the selected menu items for this passenger
            let selectedItems = [];
            $(this).find('.menu-dropdown').each(function() {
                let selectedItem = $(this).val();
                // Add the selected item to the array, if a valid selection is made
                if (selectedItem !== 'Select item') {
                    selectedItems.push(selectedItem);
                } else{
                    selectedItems.push('');
                }
            });
            // Add the array of selected items to the orderedItems object
            if (selectedItems.length > 0) {
                orderedItems[passengerName] = selectedItems;
            }
        });

        // Convert the orderedItems object to a JSON string
        let orderedItemsJSON = JSON.stringify(orderedItems);

        // Store the JSON string in session storage
        sessionStorage.setItem('orderedItems', orderedItemsJSON);
        window.location.hash = "payment";
        tabs.removeClass("active");
        $(".booking-nav span[data-tab='payment']").addClass("active");
    });

    if(window.location.hash === '#payment'){
        let flight = JSON.parse(sessionStorage.getItem('selectedFlight'));
        let orders =  JSON.parse(sessionStorage.getItem('orderedItems'));  
        let passengers = JSON.parse(sessionStorage.getItem('passengerData'));
        let seats = JSON.parse(sessionStorage.getItem('seatConfirmed'));

        let completePassengers = [];
        for(let i=0; i<passengers.length; i++){
            let fullName = passengers[i]['personal'].title + ' ' + passengers[i]['personal'].firstName + ' ' + passengers[i]['personal'].lastName;
            let passengerObj = {
                ticketID : generateOrderNumber(),
                personal : passengers[i].personal,
                contact : passengers[i].contact,
                seat : seats[fullName],
                addOns : orders[fullName],
                flight : flight
            }
            completePassengers.push(passengerObj);
        }

        sessionStorage.setItem('completeData',JSON.stringify(completePassengers));
    }
});

function createMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.innerHTML = `
        <div class="food-img-container">
        <img src="${item.image}" alt="${item.name}">
        </div>
        <div>
        <h4>${item.name}</h4>
        <p>${'$'+item.price}</p>
        </div>
    `;
    return menuItem;
}

function isSeatNumberExists(seatMap, seatNumber) {
    for (let value of seatMap.values()) {
        if (value === seatNumber) {
            return true;
        }
    }
    return false;
}


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

function populateDropdown(clickedBtn) {
    const dropdown = $(clickedBtn).siblings('.dropdown-content'); 
    const dropbtnWidth = $(clickedBtn).outerWidth(); 
    dropdown.width(dropbtnWidth); 
    dropdown.empty(); 
    nationalities.forEach(nationality => {
        const option = $('<div>').text(nationality);
        option.on('click', () => selectNationality(clickedBtn, nationality)); // Pass clickedBtn as an argument
        dropdown.append(option);
    });
}
  
function selectNationality(clickedBtn, nationality) {
    $(clickedBtn).text(nationality); // Update the text of the clicked button
}

function savePassengerData() {
    const passengerData = [];

    $('.passenger-data-container').each(function(index) {
        const personalDetails = $(this).find('.personal-details-row input');
        const contactDetails = $(this).find('.contact-details-row input');

        const nationality = $(this).find('.dropbtn').text();

        const passengerInfo = {
            personal: {
                title: capitalize(personalDetails.eq(0).val()),
                firstName: capitalize(personalDetails.eq(1).val()),
                lastName: capitalize(personalDetails.eq(2).val()),
                nationality: nationality,
                passport: personalDetails.eq(3).val(),
                issuePlace: personalDetails.eq(4).val(),
                expiry: personalDetails.eq(5).val()
            },
            contact: {
                email: contactDetails.eq(0).val(),
                phoneNumber: contactDetails.eq(1).val()
            }
        };

        passengerData.push(passengerInfo);
    });

    sessionStorage.setItem('passengerData', JSON.stringify(passengerData));
}


function generateOrderNumber() {
    // Generate a random 6-digit number for the order ID
    const orderId = Math.floor(Math.random() * 900000) + 100000;
  
    // Generate a random two-letter prefix for the order type
    const orderTypePrefix = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
  
    // Generate a random two-digit year
    const year = (new Date().getFullYear() % 100).toString().padStart(2, '0');
  
    // Generate a random two-digit month
    const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
  
    // Generate a random two-digit day
    const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
  
    // Combine all parts to form the order number
    const orderNumber = `${orderTypePrefix}-${orderId}-${year}${month}${day}`;
  
    return orderNumber;
  
}