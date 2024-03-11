// The function here takes the parameters that you
// have declared in the `glide.json` file, in the
// same order.
window.function = async function(option, trackingNo) {
  // For each parameter, its `.value` contains
  // either its value in the type you've declared,
  // or it's `undefined`.  This is a good place to
  // extract the `.value`s and assign default
  // values.
  //str = str.value ?? "";
  //start = start.value ?? 0;
  //end = end.value;

  trackingNo = trackingNo.value;
  selector = option.value;
    
  // Define the API endpoint and parameter
  const apiUrl = 'https://api.shipblu.com/api/v1/delivery-order/';
  const parameter = trackingNo;

  // Function to make the API request
  let packageData;
  try {
    const response = await fetch(`${apiUrl}${parameter}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    packageData = await response.json();
    
  } catch (error) {
    console.error('Error fetching data:', error);
    return "Hello World"; // Return undefined in case of error
  }
   let formattedString = "";
    // Generate formatted string based on selector value
    switch (selector) {
      case 1:
        formattedString = `${packageData.customer.first_name} ${packageData.customer.last_name}`;
        break;
      case 2:
        formattedString = packageData.customer.phone;
        break;
      case 3:
        formattedString = `${packageData.customer.address.line_1}, ${packageData.customer.address.line_2}, ${packageData.customer.address.line_3}`;
        break;
      case 4:
        formattedString = packageData.cash_amount.toString();
        break;
      default:
        formattedString = "Invalid selector value.";
    }
  return formattedString;
};
