const ipcRenderer = nodeRequire('electron').ipcRenderer;

var high = 33;
var low = 10;

var lastReading;

function calculateColor(temp){
    var range = high - low;
    var percentage = (temp - low) / high;
    
    var hue = 215 - Math.abs(215 * percentage);
    if(hue < 0) hue = 0;
    if(hue > 215) hue = 215;

    return 'hsl(' + hue + ', 100%, 50%)';
}

$(window).ready(function(){

    ipcRenderer.on("reading", (event, reading)=>{
        
        // high = reading[0][0];
        // low = reading[0][0];

        lastReading = reading;

        //Go through each row
        for(var row = 0; row <= 3; row++){

            //Go through each column/grid
            for(var grid = 0; grid <= 15; grid++){

                //Check high/low
                // if(reading[row][grid] > high) high = reading[row][grid];
                // if(reading[row][grid] < low) low = reading[row][grid]; 

                //Get the color from the reading and assign it
                $('#row_' + row + '_grid_' + grid).css("background-color", calculateColor(reading[row][grid]));

                //Set the temperature reading
                $('#row_' + row + '_grid_' + grid + "_temp").text(reading[row][grid]);

            }

        }
    });

});