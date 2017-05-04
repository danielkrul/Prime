$(document).ready(function(){
	var mainForm = $('#mainForm');
	var defaultPrime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181,187, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,323, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213];
	var userGenerated = {
		'sequence': [],
		'defaultNum': 0,
		'maxRange': 0
	};
	var i, isPrimePrint;
	var tableBody = $('#tableBody');

	function isPrime(num){
		if (num < 2) return true;
		if (num % 2 == 0) return true;

		for (i = 0; i < defaultPrime.length; i++) {
			if(defaultPrime[i] % num === 0){
				return false;
				break;
			}
		}

		return true;
	}

	if (localStorage.firstNumber && localStorage.secondNumber) {
		$('#firstNumber').val(localStorage.firstNumber);
		$('#secondNumber').val(localStorage.secondNumber);
	}

	mainForm.submit(function(e){
		tableBody.html('');
		userGenerated.defaultNum = $('#firstNumber').val() - 1;
		userGenerated.maxRange = $('#secondNumber').val();
		localStorage.firstNumber = userGenerated.defaultNum + 1;
		localStorage.secondNumber = userGenerated.maxRange;

		for (i = 0; i < userGenerated.maxRange; i++) {
			userGenerated.defaultNum++;
			userGenerated.sequence.push(userGenerated.defaultNum);
		}

		for (i = 0; i < userGenerated.sequence.length; i++) {
			!function outer(i){
		        window.setTimeout(function(){
		        	isPrimePrint = (!isPrime(userGenerated.sequence[i])) ? 'class="danger"' : '';

		        	tableBody.append('\
						<tr '+ isPrimePrint +'>\
							<td>'+ (i + 1) +'</td>\
							<td><strong>'+ userGenerated.sequence[i] +'</strong></td>\
						</tr>\
						');

		        	if (i == userGenerated.sequence.length - 1) {
    					userGenerated.defaultNum = 0;
						userGenerated.sequence = [];
    				}
				}, 10);
    		}(i);
		}

		e.preventDefault();
	});
});