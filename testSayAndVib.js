function makeSay(i){
    say("i="+i);
    vib(i);
    setTimeout(() => {
        i++;
        makeSay(i);
    }, 10000);
}
makeSay(1);