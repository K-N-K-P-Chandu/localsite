$(document).ready(function() {
	// An object containing API Providers and API Keys as key-value pairs
	var aPro = {};
	if (isValidJSON(localStorage.getItem('aPro'))) {
		aPro = JSON.parse(localStorage.getItem('aPro')) || {};
	}
	// Store the object in the browser's local storage so it remains available after closing the browser.
	function updateLocalStorage() {
	  localStorage.setItem('aPro', JSON.stringify(aPro));

	  $('#aProOutput').val(JSON.stringify(aPro, null, 2)); // .select()
	  
	  if (typeof jsyaml != "undefined") {
		  let yamlString = jsyaml.dump(aPro);
		  console.log("updateLocalStorage:\n" + yamlString);
		  if (JSON.stringify(aPro) === "{}" || typeof JSON.stringify(aPro) == "undefined") {
		  	$('#aProOutputYaml').val("");
		  	$('#copyBtn').hide();
		  } else {
		  	$('#aProOutputYaml').val(yamlString);
		  	$('#copyBtn').show();
		  }
		}
	}

	const apiKeys = [
	  'Azure AI',
	  'Building Transparency',
	  'Claude AI',
	  'Cohere AI',
	  'Data Commons',
	  'Dreamstudio AI',
	  'ChatGPT Pro',
	  'ChatGPT Assistant',
	  'Fireworks AI',
	  'Gemini AI',
	  'GitHub',
	  'Groq',
	  'Mistral AI',
	  'NVIDIA',
	  'Observable',
	  'Replicate',
	  'Serp',
	  'Together AI',
	  'X.com'
	];

	// Display a panel section for selecting or adding an API Provider and the user's API Key.
	function generateRepeatingSection(index) {
	  var html = '<div class="repeating-section" style="display:inline-text" id="panel' + index + '">' +
	             '  <div style="float: left;">' +
	             '    <label for="apiProvider' + index + '">API Provider</label><br>' +
	             '    <select id="apiProvider' + index + '" class="apiProvider">' +
	             '      <option value="">Select a provider...</option>' +
	             '      <option>Azure AI</option>' +
	             '      <option>Building Transparency</option>' +
	             '      <option>Claude AI</option>' +
	             '      <option>Cohere AI</option>' +
	             '      <option>Data Commons</option>' +
	             '      <option>Dreamstudio AI</option>' +
	             '      <option>ChatGPT Pro</option>' +
	             '      <option>ChatGPT Assistant</option>' +
	             '      <option>Fireworks AI</option>' +
	             '      <option>Gemini AI</option>' +
	             '      <option>GitHub</option>' +
	             '      <option>Groq</option>' +
	             '      <option>Mistral AI</option>' +
	             '      <option>NVIDIA</option>' +
	             '      <option>Observable</option>' +
	             '      <option>Replicate</option>' +
	             '      <option>Serp</option>' +
	             '      <option>Together AI</option>' +
	             '      <option>X.com</option>' +
	             '      <!-- Add more API providers here, see list in README file -->' +

	             /*
	             '      <option>Amazon Web Services (AWS)</option>' +
	             '      <option>Dropbox API</option>' +
	             '      <option>eBay API</option>' +
	             '      <option>Facebook Graph API</option>' +
	             '      <option>Google API</option>' +
	             '      <option>Instagram Graph API</option>' +
	             '      <option>LinkedIn API</option>' +
	             '      <option>Mailchimp API</option>' +
	             '      <option>Microsoft Azure API</option>' +
	             '      <option>PayPal API</option>' +
	             '      <option>Reddit API</option>' +
	             '      <option>Salesforce API</option>' +
	             '      <option>SendGrid API</option>' +
	             '      <option>Shopify API</option>' +
	             '      <option>Slack API</option>' +
	             '      <option>Spotify Web API</option>' +
	             '      <option>Stripe API</option>' +
	             '      <option>Twilio API</option>' +
	             '      <option>Yelp API</option>' +
	             '      <option>YouTube API</option>' +
	             '      <option>Zoom API</option>' +
	             */
	             '      <option>Other</option>' +
	             '    </select><br>' +
	             '    <input type="text" id="apiProviderOther' + index + '" placeholder="Other Provider" class="textInput" style="display:none; min-width:225px; margin-bottom:10px">' +
	             '  </div>' +
	             '  <div style="overflow:auto; min-width:300px">' +
	             '    <label for="apiKey' + index + '">API Key</label><br>' +
	             '    <input type="text" class="textInput" id="apiKey' + index + '" style="min-width:140px;max-width:140px;width:100%; margin-bottom:10px">' +
	             '  </div>' +
	             '</div>';
	  return html;
	}
	// Above was: min-width:300px;max-width:540px;

	// Apply key-value pairs from the local storage object to the panels
	function populateRepeatingSections() {
		// Clears form and re-renders panels
	  $('#formContainer').empty();
	  let index = 1;
	  for (var key in aPro) {
	    //var index = key.match(/\d+/)[0];

	    /*
	    let appendNumber = key.match(/\d+/);
			if (appendNumber) {
			  appendNumber = parseInt(appendNumber) + 1;
			} else {
			  // Handle the case when no match is found, e.g., set a default value
			  appendNumber = "";
			}

			// Avoiding appending for now
			appendNumber = "";
			*/

	    $('#formContainer').append(generateRepeatingSection(index)); // Add blank panel to populate
	    //$('#apiProvider' + index).val(key.replace(/\d+/, '').replace(/_/g, ' '));
	    let keyOnly = key.replace(/\s*\(\d+\)$/, ""); // Remove number in parenthesis at end.
	    if (apiKeys.includes(keyOnly)) {
		    $('#apiProvider' + index).val(keyOnly);
		} else {
			$('#apiProvider' + index).val('Other');
			$('#apiProviderOther' + index).val(key).show();
		}
	    
	    if ($('#apiProvider' + index).val() == 'Other') {
	    	//$('#apiProviderOther' + index).val(aPro[key]).show();
	    	$('#apiProviderOther' + index).show();
	    }

	    $('#apiKey' + index).val(aPro[key]);
	    
	    index++;
	  }
	  
	  if (JSON.stringify(aPro) === "{}") {
	  	//alert("okay " + JSON.stringify(aPro));
	  	$('#aProOutput').val("");
	  	$('#aProOutputYaml').val("");
	  } else {
		  $('#aProOutput').val(JSON.stringify(aPro, null, 2)); // .select()
		  if (typeof jsyaml != "undefined") {
		  	let yamlString = jsyaml.dump(aPro); // TO DO: Remove ticks around YAML displayed in textbox.
			  $('#aProOutputYaml').text(yamlString);
			  $('#copyBtn').show();
			}
		}
	}

	// INIT
	populateRepeatingSections();
	if ($('.repeating-section').length == 0) {
	  $('#formContainer').append(generateRepeatingSection(1)); // Show one panel at init
	}

	$('#addApi').click(function() {
	  var newIndex = $('.repeating-section').length + 1;
	  $('#formContainer').append(generateRepeatingSection(newIndex));
	});

	$(document).on('change', 'select[id^="apiProvider"]', function() { // Changing provider dropdown
	  var index = $(this).attr('id').match(/\d+/)[0];
	  console.log("Change index " + index);
	  var key = $(this).val();
		let value = $("#apiKey" + index).val();
		if (key == 'Other') {
			key = $("#apiProviderOther" + index).val();
	    $('#apiProviderOther' + index).show();
	  } else {
	    $('#apiProviderOther' + index).hide();
	  }
	  if (value) {
  		updateApiRow(index,key,value);
  	}
	});

	$(document).on('input', 'input[id^="apiKey"]', function() { // Editing apiKey field
	  let index = $(this).attr('id').match(/\d+/)[0];
	  let key = $("#apiProvider" + index).val();
	  let value = $(this).val();
	  if (key) {
	    // Get key of nth pair in object
	    /*
	    for (let key in aPro) {
		    if (aPro.hasOwnProperty(key)) {
		      //count++;
		    }
		  }
		*/
		if (!value) { // Deleting Row by clearing API Key
			console.log("Delete apiProvider " + $('#apiProvider' + index).val().replace(/ /g, '_'));
		    delete aPro[$('#apiProvider' + index).val()];
		    updateLocalStorage();
		    $('#panel' + index).remove();
		} else {
		  	updateApiRow(index,key,value);
		}
	  }
	});
	$(document).on('input', 'input[id^="apiProviderOther"]', function() { // Editing Other API name
		let index = $(this).attr('id').match(/\d+/)[0];
		let key = $(this).val();
		let value = $("#apiKey" + index).val();
		//alert(key)
		if (!value) { // Deleting Row by clearing API Key
			//console.log("Delete apiProvider " + $('#apiProvider' + index).val().replace(/ /g, '_'));
		    //delete aPro[$('#apiProvider' + index).val()];
		    //updateLocalStorage();
		    //$('#panel' + index).remove();
		} else if (key && value) {
			//alert("key " + key + " value " + value);
		  	updateApiRow(index,key,value);
		}
	});
	function updateApiRow(index,key,value) {
		let apiProviderStr = $('#apiProvider' + index).val().replace(/\s*\(\d+\)$/, ""); // Remove number in parenthesis at end.
	  	let instanceCount = 0;
	  	let storageCount = 0;
	  	for (let thekey in aPro) {
  		  storageCount++;
		  if (thekey.startsWith(apiProviderStr)) {
		    instanceCount++;
		  } else if (storageCount == index) { // The one index currently being updated
		  	instanceCount++;
		  }
		}
  		let keyName = $('#apiProvider' + index).val();
  		if (keyName == "Other") {
  			keyName = $('#apiProviderOther' + index).val();
  		}
  		aProCount = countKeyValuePairs(aPro);

		console.log("index: " + index + "\nprovider: " + key + "\nkeyname (from dropdown via index): " + keyName + "\nvalue: " + value + "\nprovider instanceCount: " + instanceCount);
	  	if (index > aProCount) { // Add new record - there are more panels than key-value pairs.
	  		//if(aPro[$('#apiProvider' + index).val()].length > 0) {
	  			if (instanceCount >= 1) { // Already records
	  				keyName = keyName + " (" + (instanceCount+1) + ")"; // Increment since adding
	  				console.log("Add new record keyName " + keyName);
	  			}
	  		//}
	  	} else {
	  		if (instanceCount > 1) { // The existing record uses a paren number
	  			keyName = keyName + " (" + (instanceCount) + ")";
	  			console.log("Update keyName " + keyName);
	  		} else {
	  			console.log("Update - Only one instanceCount keyName " + keyName);
	  		}
	  	}

	  	// In JavaScript, object keys must be unique
	  	if (typeof aPro == "undefined") { // Since may have been deleted using Clear All.
	  		aPro = {};
	  	}
	  	//aPro[keyName] = value;
	  	console.log("updateByIndex " + index) //index-1
	  	updateByIndex(aPro, index, key, value);

	  	// Replaces spaces with _
	  	//if (index == 1) { // Omit 1 from end of provider key.
	  	//	aPro[$('#apiProvider' + index).val().replace(/ /g, '_')] = value;
	  	//} else {
	    //	aPro[$('#apiProvider' + index).val().replace(/ /g, '_') + index] = value;
	  	//}
	    updateLocalStorage();
	}
	function countKeyValuePairs(obj) { // Length of object
	  let count = 0;
	  for (let key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      count++;
	    }
	  }
	  return count;
	}
	// Function to update the key and value at a given index
	function updateByIndex(obj, index, newKey, newValue) {
	  const keys = Object.keys(obj);
	  
	  if (index >= 0 && index < keys.length) {
	    const oldKey = keys[index];
	    
	    // Delete the old key and set the new key-value pair
	    obj[newKey] = newValue;
	    delete obj[oldKey];
	  } else {
	    console.log("Invalid index");
	  }
	}

	document.addEventListener('input', function(event) {
	    if (event.target && event.target.matches('#aProOutputYaml')) {
	        $("#updateBtn").addClass("button-green");
	    }
	});
	
	// Delayed, wait until clicking off textarea
	//$(document).on('change', '#aProOutputYaml', function() {
	//	alert("change")
	//});

	$('#copyBtn').click(function() {
	  $('#aProOutputYaml').select();
	  document.execCommand('copy');
	});

	$('#closeBtn').click(function() {
	  $('#aProOutput').hide();
	  $(this).hide();
	});

	$('#pasteBtn').click(function() {
	  $('#aProInput').show();
	  $('#aProInput').val('').focus();
	});

	$('#updateBtn').click(function() {
		$("#updateBtn").removeClass("button-green");
		//aPro = JSON.parse($('#aProOutput').val()); // From json textbox.
		if (hasDuplicateKeys($('#aProOutputYaml').val())) {
			alert("Duplicate provides. Please add (2) after second instance.");
		} else {
			aPro = jsyaml.load($('#aProOutputYaml').val()); // From yaml textbox.
			updateLocalStorage();
			if (countKeyValuePairs(aPro) == 0) {
				if ($('#formContainer').is(':empty')) {
					$('#formContainer').append(generateRepeatingSection(1));
				}
			} else {
			  populateRepeatingSections();
			}
		}
	});
	function hasDuplicateKeys(yamlString) {
	    var lines = yamlString.split('\n');
	    var seenKeys = {};

	    for (var i = 0; i < lines.length; i++) {
	        var line = lines[i].trim();
	        if (line && line[0] !== '#') {
	            var keyValue = line.split(':');
	            var key = keyValue[0].trim();
	            if (seenKeys[key]) {
	                return true;
	            } else {
	                seenKeys[key] = true;
	            }
	        }
	    }
	    return false;
	}

	$('#aProInput').on('input', function() {
	  var input = $(this).val().trim();
	  if (input) {
	    try {
	      var parsed = JSON.parse(input);
	      for (var key in parsed) {
	        var originalKey = key.replace(/\d+/g, '').replace(/_/g, ' ');
	        var existingKeys = Object.keys(aPro).map(function(k) { return k.replace(/\d+/g, '').replace(/_/g, ' '); });
	        if (!existingKeys.includes(originalKey)) {
	          aPro[key] = parsed[key];
	        } else {
	          var counter = 2;
	          while (existingKeys.includes(originalKey + counter)) {
	            counter++;
	          }
	          aPro[originalKey.replace(/ /g, '_') + counter] = parsed[key];
	        }
	      }
	      updateLocalStorage();
	      populateRepeatingSections();
	    } catch (error) {
	      console.error('Error parsing input:', error);
	    }
	  }
	});

	$('#clearAll').click(function() {

		if (1==1) { // Skip confirmation step
			localStorage.removeItem('aPro');
	    aPro = {};
	    populateRepeatingSections();
	    $('#formContainer').append(generateRepeatingSection(1));
	    return;
    }

	  var confirmation = prompt('Are you sure? Enter "YES" to proceed.');
	  if (confirmation && confirmation.toUpperCase() === 'YES') {
	    localStorage.removeItem('aPro');
	    aPro = {};
	    populateRepeatingSections();
	    $('#formContainer').append(generateRepeatingSection(1));
	    alert('Your API Keys have been cleared from local storage.');
	  }
	});
	
});
