const apiUrl = "http://127.0.0.1:5501/api/collections";

const onCollectionFilterClicked = (e) => {
  const val = e.target.value;
  if (val === "all") {
    console.log("all");
    fetch(`${apiUrl}/data.json`, { method: "get" })
      .then((respone) => {
        return respone.json();
      })
      .then((body) => {
        console.log(body);
        const collections = body.data;

        const lableIdPrefix = "collection-label";
        let index = 0;
        resetColletionFilter();
        collections.forEach((collection) => {
          // console.log()
          appendToCollectionFilder(collection, lableIdPrefix, index);
          index++;

          // get api nft detail
          fetch(`${apiUrl}/${collection.address}/listingNft.json`, {
            method: "get",
          })
            .then((respone) => {
              return respone.json();
            })
            .then((body) => {
              console.log(body);
              const nft_details = body.data;
              appendToNftsContainer(nft_details, collection);
            });
        });
      });
  } else {
    const collectionName = e.target.getAttribute("data-name");
    console.log(collectionName);
    fetch(`${apiUrl}/${val}/listingNft.json`, {
      method: "get",
    })
      .then((respone) => {
        return respone.json();
      })
      .then((body) => {
        console.log(body);
        const nft_details = body.data;
        resetNftsContainer();
        appendToNftsContainer(nft_details, {
          name: collectionName,
          address: val,
        });
      });
  }
};

const createCollectionFilterDiv = (value, checked, id, innerText) => {
  const listElementDiv = document.createElement("div");
  listElementDiv.className = "f2__list_element_1";

  const input = document.createElement("input");
  input.className = "collection";
  input.setAttribute("type", "radio");
  input.setAttribute("class", "checkbox1");
  input.setAttribute("value", value);
  input.setAttribute("id", id);
  input.setAttribute("data-name", innerText);
  if (checked) {
    input.setAttribute("checked", checked);
  }

  input.setAttribute("name", "check_box_1");

  input.onclick = onCollectionFilterClicked;
  const label = document.createElement("label");
  label.setAttribute("for", id);
  const span = document.createElement("span");
  span.innerHTML = "  " + innerText;

  label.appendChild(span);
  listElementDiv.appendChild(input);
  listElementDiv.appendChild(label);

  return listElementDiv;
};

const resetColletionFilter = () => {
  document.getElementById("filter__collection__test").innerHTML = "";
  const all = createCollectionFilterDiv(
    "all",
    true,
    "collection-all",
    " All collections"
  );
  document.getElementById("filter__collection__test").appendChild(all);
};

const resetNftsContainer = () => {
  document.getElementById("list_nft").innerHTML = "";
};

const appendToCollectionFilder = (collection, lableIdPrefix, index) => {
  const collectionAddress = collection.address;
  // console.log('``````````````',collection)
  const div = createCollectionFilterDiv(
    collectionAddress,
    false,
    `${lableIdPrefix}-${index}`,
    collection.name
  );

  document.getElementById("filter__collection__test").appendChild(div);
};

const appendToNftsContainer = (nft_details, collection) => {
  const nftDetailElement = document.getElementById("list_nft");

  nft_details.forEach((nft_detail) => {
    // console.log(nft_detail);
    const div_card = document.createElement("div");
    div_card.className = "card";
    div_card.setAttribute("id", `${collection.name}`);
    div_card.setAttribute("data-price", `${nft_detail.price}`);
    div_card.setAttribute("data-id", `${nft_detail.tokenId}`);
    div_card.setAttribute("data-class", `${nft_detail.classHero}`);

    const div_heart = document.createElement("div");
    div_heart.className = "card__heard";
    const i_heart = document.createElement("i");
    i_heart.className = "bx bx-heart";
    div_heart.appendChild(i_heart);

    const div_cart = document.createElement("div");
    div_cart.className = "card__cart";
    const i_cart = document.createElement("i");
    i_cart.className = "bx bx-cart-alt";
    div_cart.appendChild(i_cart);

    const div_img = document.createElement("div");
    div_img.className = "card__img";
    const img_nft = document.createElement("img");
    img_nft.setAttribute("src", nft_detail.imgNFT);
    div_img.appendChild(img_nft);

    const div_title = document.createElement("div");
    div_title.className = "card__title";
    div_title.innerHTML = `${collection.name} #` + nft_detail.tokenId;

    const div_price = document.createElement("div");
    div_price.className = "card__price";
    div_price.innerHTML = "$ " + nft_detail.price;

    const div_class = document.createElement("div");
    div_class.className = "card__class";
    const h3_class = document.createElement("h3");
    h3_class.innerHTML = "Class:";
    const span_class = document.createElement("span");
    span_class.innerHTML = nft_detail.classHero;
    div_class.appendChild(h3_class);
    div_class.appendChild(span_class);

    const div_color = document.createElement("div");
    div_color.className = "card__color";
    const h3_color = document.createElement("h3");
    h3_color.innerHTML = "Color:";
    const span_color = document.createElement("span");
    span_color.className = `card__color--${nft_detail.colorHero}`;
    div_color.appendChild(h3_color);
    div_color.appendChild(span_color);

    const div_action = document.createElement("div");
    div_action.className = "card__action";
    const action_button_1 = document.createElement("button");
    action_button_1.innerHTML = "Buy Now";
    const action_button_2 = document.createElement("button");
    action_button_2.innerHTML = "Add Cart";
    div_action.appendChild(action_button_1);
    div_action.appendChild(action_button_2);

    div_card.appendChild(div_heart);
    div_card.appendChild(div_cart);
    div_card.appendChild(div_img);
    div_card.appendChild(div_title);
    div_card.appendChild(div_price);
    div_card.appendChild(div_class);
    div_card.appendChild(div_color);
    div_card.appendChild(div_action);
    nftDetailElement.appendChild(div_card);
  });
};

const setCollectionDetail = (collection_detail) => {
  document.getElementById("collection_item_value").innerHTML =
    collection_detail.listings;
  document.getElementById("collection_holder").innerHTML =
    collection_detail.uniqueHolders;
  document.getElementById("collection_volume").innerHTML =
    "$" + collection_detail.totalVolume;
  document.getElementById("collection_floor_price").innerHTML =
    "$" + collection_detail.floorPrice;
};

const getCollectionDetail = (collectionAddress) => {
  fetch(`${apiUrl}/${collectionAddress}`, { method: "get" })
    .then((respone) => {
      return respone.json();
    })
    .then((body) => {
      console.log(body);
      const collection_detail = body.data;
      setCollectionDetail(collection_detail);
    });
};

//get collections vo filter va data
fetch(`${apiUrl}/data.json`, { method: "get" })
  .then((respone) => {
    console.log("2")
    return respone.json();
  })
  .then((body) => {
    console.log(body);
    const collections = body.data;

    const lableIdPrefix = "collection-label";
    let index = 0;
    console.log(collections);
    resetColletionFilter();
    collections.forEach((collection) => {
      // console.log()
      appendToCollectionFilder(collection, lableIdPrefix, index);
      index++;

      // get api nft detail
      fetch(`${apiUrl}/${collection.address}/listingNft.json`, {
        method: "get",
      })
        .then((respone) => {
          return respone.json();
        })
        .then((body) => {
          // console.log(body);
          const nft_details = body.data;
          appendToNftsContainer(nft_details, collection);
        });
    });
  });
console.log("1")


//lay value cua collection filter
const getFilterCollectionValue = () => {};
const getFilterByClassValue = () => {};
const getCollectionNftsAsync = async (filterCollectionValue) => {
  //fetch
  if (filterCollectionValue === "all") {
    const response = await fetch("/adasd");
    const data = [];

    return data; //[]
  } else {
  }
};
const filterDataByClassValue = (data, filterByClassValue) => {
  //data= [ {id:1,class: "S"},{id:1,class: "C"}]
  //filterByClassValue = "S"
  return [];
};
const displayData = (filteredData) => {
  filteredData.forEach((item) => {});
};

const renderNftsAsync = async () => {
  const filterCollectionValue = getFilterCollectionValue();
  const data = await getCollectionNftsAsync(filterCollectionValue);
  [1,3,2,4,5]
  const filterByClassValue = getFilterByClassValue();
  const dataFilteredByClass = filterDataByClassValue(data, filterByClassValue);


  const sortByValue = getSortByValue();
  //sortByPrice
  const dataSortByValue = sortDataValue(data, sortByValue);
  //dataSortByValue = [1,2,3,4,5]

  // const filterByClassValue = getFilterByClassValue();
  // const dataFilteredByClass = filterDataByClassValue(data, filterByClassValue);

  displayNfts(dataFilteredByClass);
};
