let count = 1;

function participantTemplate(count) {
    return `<section class="participant${count}">
            <p>Participant ${count}</p>
            <div class="item">
                <label for="fname"> First Name<span>*</span></label>
                <input id="fname${count}" type="text" name="fname" value="" required />
            </div>
            <div class="item activities">
                <label for="activity">Activity #<span>*</span></label>
                <input id="activity${count}" type="text" name="activity" />
            </div>
            <div class="item">
                <label for="fee">Fee ($)<span>*</span></label>
                <input id="fee${count}" type="number" name="fee" />
            </div>
            <div class="item">
                <label for="date">Desired Date <span>*</span></label>
                <input id="date${count}" type="date" name="date" />
            </div>
            <div class="item">
                <p>Grade</p>
                <select>
                <option selected value="" disabled selected></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
                </select>
            </div>
    </section>`;
}

let button = document.querySelector("#add");

function addParticipant() {
    count++;
    button.insertAdjacentHTML("beforebegin", participantTemplate(count));
}

button.addEventListener("click",addParticipant);

const form = document.querySelector("form");
const summary = document.getElementById("summary");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const feeInputs = form.querySelectorAll("input[id^='fee']");
  let totalFee = 0;
  feeInputs.forEach((input) => {
    const fee = parseFloat(input.value);
    if (!isNaN(fee)) {
      totalFee += fee;
    }
  });

  const adultName = document.getElementById("adult_name").value.trim();

  const numParticipants = form.querySelectorAll("section[class^='participant']").length;

  form.style.display = "none";
  summary.style.display = "block";

  summary.innerHTML = `<h2>Thank you ${adultName} for registering.</h2>
  <p>You have registered ${numParticipants} participant(s) and owe $${totalFee.toFixed(2)} in fees.</p>`;
});

// Calculate total fees from all inputs with id starting with "fee"
function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements]; // Convert NodeList to Array

  // Reduce to total
  const total = feeElements.reduce((sum, input) => {
    const val = parseFloat(input.value);
    return !isNaN(val) ? sum + val : sum;
  }, 0);

  return total;
}

// Generate the success message HTML
function successTemplate(info) {
  return `
    <h2>Thank you ${info.adultName} for registering.</h2>
    <p>You have registered ${info.numParticipants} participant(s) and owe $${info.totalFees.toFixed(2)} in fees.</p>
  `;
}

// Submit handler function
function submitForm(event) {
  event.preventDefault();

  // Build the info object
  const info = {
    totalFees: totalFees(),
    adultName: document.getElementById("adult_name").value.trim(),
    numParticipants: document.querySelectorAll("section[class^='participant']").length
  };

  // Hide form
  document.querySelector("form").style.display = "none";

  // Show summary
  const summary = document.getElementById("summary");
  summary.innerHTML = successTemplate(info);
  summary.style.display = "block";
}

// Hook up event listener
document.querySelector("form").addEventListener("submit", submitForm);
