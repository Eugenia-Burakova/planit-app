const triggerButton = document.getElementById('triggerButton');
        const container = document.getElementById('days');
        let divCount = 1; // To give unique IDs to new divs

        triggerButton.addEventListener('click', function() {
            // Get input and elements
            const destination = document.getElementById('trip_name');
            const startDate = document.getElementById('trip_start-date');
            const duration = document.getElementById('trip_duration');
            
            // Get input values
            const destinationValue = document.querySelector('.trip__name').value;
            const startDateValue = new Date(document.querySelector('.trip__start-date').value);
            const trip__duration = document.querySelector('.trip__duration').value;
            
            // Validate inputs
            if (!destinationValue || isNaN(startDateValue) || !trip__duration || trip__duration <= 0) {
                alert('Please fill in all fields with valid values.');
                return;
            }
            
            // Remove input container and button
            const tripContainer = document.getElementById('tripContainer');
            tripContainer.remove();
            triggerButton.remove();

            // Add destination label
            const destinationLabel = document.createElement('label');
            destinationLabel.textContent = destinationValue;
            destinationLabel.id = 'destinationLabel';
            destinationLabel.classList.add('destinationLabel');
            document.querySelector('.trip').appendChild(destinationLabel);

            for (let i = 1; i <= trip__duration; i++) {

                // Create a new div element
                const newDiv = document.createElement('div');

                // Add a class and unique ID to the new div
                newDiv.classList.add('newDiv');
                newDiv.id = 'day' + divCount;
                
                //Add a title with day of the week
                const titleElement = document.createElement("h2");
                const dayName = (date, locale) => date.toLocaleDateString(locale, { weekday: 'long' });
                titleElement.textContent = "Day " + divCount + ' (' + dayName(startDateValue, 'en-US') + ')';
                startDateValue.setDate(startDateValue.getDate() + 1);
                newDiv.appendChild(titleElement);

                //add activity input div
                const activityDiv = document.createElement('div');
                activityDiv.classList.add('activityDiv');
                newDiv.appendChild(activityDiv);

                //add activity grid
                const activityGrid = document.createElement('div');
                activityGrid.classList.add('activityGrid');

                // Add an input field
                const inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.placeholder = "Activity";
                activityDiv.appendChild(inputElement);

                // Add a button to add activities
                const buttonElement = document.createElement("button");
                buttonElement.type = "button";
                buttonElement.textContent = "Add Activity";
                buttonElement.addEventListener("click", function() {
                    const activityRow = document.createElement('div');
                    activityRow.classList.add('activityRow');
                    const activity = inputElement.value;
                    if (activity) {
                        // Create activity elements
                        const activityElement = document.createElement("p");
                        activityElement.textContent = activity;
                        activityRow.appendChild(activityElement);
                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = "✖";
                        deleteButton.addEventListener("click", function() {
                            activityRow.removeChild(activityElement);
                            activityRow.removeChild(deleteButton);
                        });
                        activityRow.appendChild(deleteButton);
                        activityGrid.appendChild(activityRow);
                        inputElement.value = ""; // Clear the input
                    }
                });
                activityDiv.appendChild(buttonElement);
                newDiv.appendChild(activityDiv);
                newDiv.appendChild(activityGrid);

                // Append the new div to the container
                container.appendChild(newDiv);

                divCount++; // Increment the counter for the next div
            }
        });