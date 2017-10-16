export function testThis() {
  return(dispatch) => {
    console.log("tests")
    dispatch({ type: "Test", payload: {item: "test1"} })
  }
}