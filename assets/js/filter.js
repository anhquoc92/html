function FilterCardByClass() {
  let fieldMmarket = document.querySelector(".market__nft");
  let divCards = Array.from(fieldMmarket.children);

  let filterCardClass = document.querySelector('.filter__f2__list_group_class').children;

  this.run = function() {
    for(let i=0; i<filterCardClass.length; i++)
  {
    filterCardClass[i].onlick = function () {
      for(let x=0; x<filterCardClass.length; x++)
      {
        filterCardClass[x].classList.remove('active')
        console.log(filterCardClass)
      }
      this.classList.add('active');
      const displayItems = this.getAttribute('data-filter');
      
      for(let z=0; z<divCards.length; z++) {
        divCards[z].style.transform = 'scale(0)';
        setTimeout(()=>{
          divCards[z].style.display = 'none';
        },500);
        if ((divCards[z].getAttribute('data-class') == displayItems) || displayItems == 'all')
        {
          divCards[z].style.transform = 'scale(1)';
          setTimeout(()=>{
            divCards[z].style.transform = "block";
          }, 500);
        }
      }
    }
  }
}
}
function SortProduct() {
  let select = document.getElementById("select");
  let divCardArray = [];
  this.run = () => {
    addevent();
  };
  function getDivCards() {
    let fieldMmarket = document.querySelector(".market__nft");
    let divCards = Array.from(fieldMmarket.children);
    for (let divCard of divCards) {
      // const last = i.getElementsByClassName('card__price')
      // const x = last.textContent.trim();
      // const y = Number(x.substring(1), y);
      divCardArray.push(divCard);
    }
  }
  function addevent() {
    select.onchange = sortingValue;
  }
  function removeAllChildren() {
    let fieldMmarket = document.querySelector(".market__nft");
    while (fieldMmarket.firstChild) {
      fieldMmarket.removeChild(fieldMmarket.firstChild);
    }
  }
  function sortingValue() {
    getDivCards();
    console.log()
    if (this.value === "Default") {
      SortElemDefault(true);
    }
    if (this.value === "LowToHigh") {
      SortElem(true);
    }
    if (this.value === "HighToLow") {
      SortElem(false);
    }
  }
  function SortElem(asc) {
    let dm, sortDivCard;
    dm = asc ? 1 : -1;
    sortDivCard = divCardArray.sort((a, b) => {
    //   console.log(a);
      const ax = Number.parseInt(a.getAttribute("data-price"));
      const bx = Number.parseInt(b.getAttribute("data-price"));
      return ax > bx ? 1 * dm : -1 * dm;
    });
    removeAllChildren();

    let fieldMmarket = document.querySelector(".market__nft");
    fieldMmarket.append(...sortDivCard);
  }

  function SortElemDefault(asc) {
    let dm, sortDivCard;
    dm = asc ? 1 : -1;
    sortDivCard = divCardArray.sort((c, d) => {
            const cx = c.getAttribute('data-id');
            const dx = d.getAttribute('data-id');
            return cx > dx ? 1 * dm : -1 * dm;
    });
    removeAllChildren();
    let fieldMmarket = document.querySelector(".market__nft");
    fieldMmarket.append(...sortDivCard);
    }
    }

new SortProduct().run();
new FilterCardByClass().run()
