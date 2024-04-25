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
        console.log(count);
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
                            origin: selectedFlight.find('.row1:eq(0)').text().trim(),
                            destination: selectedFlight.find('.row1:eq(2)').text().trim(),
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
        console.log("hi");
        populateDropdown(this);
    })

    $('#nextBtn').click(function(){
        savePassengerData();
        window.location.hash = "seats";
        tabs.removeClass("active");
        $(".booking-nav span[data-tab='seats']").addClass("active");
    })

    $('#toPaymentBtn').click(function(){
        savePassengerData();
        window.location.hash = "payment";
        tabs.removeClass("active");
        $(".booking-nav span[data-tab='payment']").addClass("active");
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
                title: personalDetails.eq(0).val(),
                firstName: personalDetails.eq(1).val(),
                lastName: personalDetails.eq(2).val(),
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
