function oblicz() {
    let l1 = document.getElementById('l1');
    l1 = l1.value;
    l1 = parseInt(l1);
    const l2 = parseInt(document.getElementById('l2').value);
    const s = document.getElementById('suma');
    s.value = l1 + l2;
}