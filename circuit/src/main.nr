fn main(x: Field, y: pub Field) {
    assert(y.lt(x));
}

#[test]
fn test_main() {
    main(3, 2);

    // Uncomment to make test fail
    // main(1, 2);
}