var corpFlightBookings = function(bookings, n) {
    let res = Array(n).fill(0);
    for(const b of bookings){
        const start = parseInt(b[0]) - 1;
        const end = parseInt(b[1]);
        const seats = parseInt(b[2]);
        for(let i = start; i < end; i++){
            res[i] += seats;
        }
    }
    return res;
};
console.log(corpFlightBookings([[1,2,10],[2,3,20],[2,5,25]],5))