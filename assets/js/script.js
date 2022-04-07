// current date/time is header
var projectNameEl = $("#project-name");
var projectTypeEl = $("#project-type");
var hourlyWageEl = $("#hourly-wage");
var dueDateEl = $("#due-date");
var projectFormEl = $("#project-form");
var modalForm = $("#modal-form");
var tableBody = $("#table-body");
// show time with setinterval in header
var updateTime = function setTimeDate()
{
var todayDate = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
$("#currentDay").text(todayDate);
}
updateTime(); 
setInterval(updateTime, 1000); 

// show datepicker in form
$(function() {
    dueDateEl.datepicker({
        minDate: 0,  // must be today or future date
    });
} );

// listen for form submit
projectFormEl.on("submit", function(){
    event.preventDefault();            
    var projectNameVal = projectNameEl.val();
    var projectTypeVal = projectTypeEl.val();
    var hourlyWageVal = hourlyWageEl.val();
    var dueDateVal = dueDateEl.val();
    resetForm();
    modalForm.modal('hide');
    processForm(projectNameVal, projectTypeVal, hourlyWageVal, dueDateVal)
})
// clear form data
function resetForm()
{
    projectFormEl.each(function(){
        this.reset();
    });
}

// Delegate event listener to the parent element
tableBody.on('click', '.delete-button', function (event) {
    $(this).parent().remove();
});
  
// process form data
function processForm(projectName, projectType, hourlyWage, dueDate)
{   
    var trEl = $('<tr>');
    var tdProjectNameEl = $('<td></td>').text(projectName);
    var tdProjectTypeEl = $('<td></td>').text(projectType);
    var tdHourlyRateEl = $('<td></td>').text(hourlyWage);;
    var tdDueDateEl = $('<td></td>').text(dueDate);
    
    var daysuntilduedate = moment(dueDate).startOf('day').fromNow().replace("in ", "");
    var tdDaysUntilDueDateEl = $('<td></td>').text(daysuntilduedate);

    // For printing the estimated total earned amount, assume that you work an eight-hour day. 
    // So multiply the hourly rate by 8 to get the daily rate, then multiply 
    // that value by how many days until the project is due to get the estimated total earned.
    var tdTotalEarningEl = $('<td></td>').text(parseFloat(hourlyWage) * 8 * parseFloat(daysuntilduedate));
    var tdDeleteEl = $('<td class="delete-button"></td>').text('X');

    trEl.append(tdProjectNameEl, tdProjectTypeEl, tdHourlyRateEl, tdDueDateEl, 
        tdDueDateEl, tdDaysUntilDueDateEl, tdTotalEarningEl, tdDeleteEl);
    tableBody.append(trEl);    
}