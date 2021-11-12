const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

console.log("Hello from the client");

const formCode =
  '<form><label>If you like my work, please consider sending me a tip!</label><input value="0.01" /> <span>ETH</span><button>Tip</button></form>';

let form;

// Check when DOM is ready
if (document.readyState === "complete") {
  // Fully loaded!
  form = injectForm();
} else if (document.readyState === "interactive") {
  // DOM ready! Images, frames, and other subresources are still downloading.
  // DO NOTHING
} else {
  // Loading still in progress.
  // To wait for it to complete, add "DOMContentLoaded" or "load" listeners.

  window.addEventListener("DOMContentLoaded", () => {
    // DOM ready! Images, frames, and other subresources are still downloading.
    // DO NOTHING
  });

  window.addEventListener("load", () => {
    // Fully loaded!
    injectCss();
    form = injectForm();
    attachFormListener();
  });
}

// Inject the Form code
const injectForm = () => {
  const containerDiv = document.createElement("div");
  containerDiv.innerHTML = formCode;
  containerDiv.setAttribute("id", "crypto-tip");
  document.body.appendChild(containerDiv);

  return containerDiv;
};

const injectCss = () => {
  // Get HTML head element
  var head = document.getElementsByTagName("HEAD")[0];
  // Create new link Element
  var link = document.createElement("link");
  // set the attributes for link element
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "style.css";
  // Append link element to HTML head
  head.appendChild(link);
};

const attachFormListener = () => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (window.ethereum) {
      const input = form.querySelector("input");
      send(input.value);
    } else {
      alert("Please install MetaMask to use this app");
    }
  });
};

const send = async (amount) => {
  // alert("We are going to send " + amount + " to the server");
  let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

  const wei = web3.utils.toWei(amount, "ether");

  if (accounts.length > 0) {
    window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          to: "0x9F1207a8F774C27A7f8c1a29d78ed291Cf0B5fF3",
          value: web3.utils.toHex(wei),
        },
      ],
    });
  } else {
    alert("Please connect to metamask");
  }
};

if (window.ethereum) {
  form.classList.add("has-eth");
}
