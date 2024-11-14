import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  links: [],
  filterLinks: [],
  isFilteringLinks: false,
  typeParent: {
    parentSummary: "",
    parentId: null,
    childrens: [
      {
        childrenSummary: "",
        childrenId: null,
        valueItem: [
          {
            valueId: null,
            title: "",
            links: "",
            desc: "",
            tags: [], //tagName, tagId
          },
        ],
        children: [],
      },
    ],
  },
};

export const todoSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    setLinks(state, action) {
      state.links = [...action.payload];
    },
    createParent(state, action) {
      state.links.push(action.payload);
      localStorage.setItem("links", JSON.stringify(state.links));
    },
    createChild(state, action) {
      const parent = state.links.find(
        (el) => Number(el.parentId) === Number(action.payload.parentId)
      );

      parent.childrens.push(action.payload.children);
      localStorage.setItem("links", JSON.stringify(state.links));
    },
    onDeleteParent(state, action) {
      const newArr = state.links.filter(
        (el) => Number(el.parentId) !== Number(action.payload)
      );
      state.links = newArr;

      localStorage.setItem("links", JSON.stringify(newArr));
    },
    onDeleteChild(state, action) {
      const parentIndex = state.links.findIndex(
        (el) => Number(el.parentId) === Number(action.payload.parentId)
      );
      const newChildArr = state.links[parentIndex].childrens.filter(
        (el) => Number(el.childrenId) !== Number(action.payload.childrenId)
      );

      state.links[parentIndex].childrens = newChildArr;

      localStorage.setItem("links", JSON.stringify(state.links));
    },
    addNewRow(state, action) {
      const parentIndex = state.links.findIndex(
        (el) => Number(el.parentId) === Number(action.payload.parentId)
      );
      const childIndex = state.links[parentIndex].childrens.findIndex(
        (el) => Number(el.childrenId) === Number(action.payload.childrenId)
      );

      state.links[parentIndex].childrens[childIndex].valueItem.push(
        action.payload.row
      );

      localStorage.setItem("links", JSON.stringify(state.links));
    },
    changeChildElements(state, action) {
      const parentIndex = state.links.findIndex(
        (el) => Number(el.parentId) === Number(action.payload.parentId)
      );
      const childIndex = state.links[parentIndex].childrens.findIndex(
        (el) => Number(el.childrenId) === Number(action.payload.childrenId)
      );
      const valueItemIndex = state.links[parentIndex].childrens[
        childIndex
      ].valueItem.findIndex(
        (el) => Number(el.valueId) === Number(action.payload.valueId)
      );

      switch (action.payload.type) {
        case "title":
          state.links[parentIndex].childrens[childIndex].valueItem[
            valueItemIndex
          ].title = action.payload.value;
          break;
        case "links":
          state.links[parentIndex].childrens[childIndex].valueItem[
            valueItemIndex
          ].links = action.payload.value;
          break;
        case "desc":
          state.links[parentIndex].childrens[childIndex].valueItem[
            valueItemIndex
          ].desc = action.payload.value;
          break;
        case "tags":
          state.links[parentIndex].childrens[childIndex].valueItem[
            valueItemIndex
          ].tags.push(action.payload.value);
          break;
        default:
          break;
      }
      localStorage.setItem("links", JSON.stringify(state.links));
    },
    changeParentSummary(state, action) {
      const parentIndex = state.links.findIndex(
        (el) => Number(el.parentId) === Number(action.payload.parentId)
      );

      state.links[parentIndex].parentSummary = action.payload.value;

      localStorage.setItem("links", JSON.stringify(state.links));
    },
    changeChildSummary(state, action) {
      const parentIndex = state.links.findIndex(
        (el) => Number(el.parentId) === Number(action.payload.parentId)
      );
      const childIndex = state.links[parentIndex].childrens.findIndex(
        (el) => Number(el.childrenId) === Number(action.payload.childrenId)
      );

      state.links[parentIndex].childrens[childIndex].childrenSummary =
        action.payload.value;

      localStorage.setItem("links", JSON.stringify(state.links));
    },
    deleteRow(state, action) {
      const parentIndex = state.links.findIndex(
        (el) => Number(el.parentId) === Number(action.payload.parentId)
      );
      const childIndex = state.links[parentIndex].childrens.findIndex(
        (el) => Number(el.childrenId) === Number(action.payload.childrenId)
      );

      state.links[parentIndex].childrens[childIndex].valueItem = state.links[
        parentIndex
      ].childrens[childIndex].valueItem.filter(
        (el) => Number(el.valueId) !== Number(action.payload.valueId)
      );

      localStorage.setItem("links", JSON.stringify(state.links));
    },
    deleteRowTags(state, action) {
      const parentIndex = state.links.findIndex(
        (el) => Number(el.parentId) === Number(action.payload.parentId)
      );
      const childIndex = state.links[parentIndex].childrens.findIndex(
        (el) => Number(el.childrenId) === Number(action.payload.childrenId)
      );
      const valueItemIndex = state.links[parentIndex].childrens[
        childIndex
      ].valueItem.findIndex(
        (el) => Number(el.valueId) === Number(action.payload.valueId)
      );

      state.links[parentIndex].childrens[childIndex].valueItem[
        valueItemIndex
      ].tags = state.links[parentIndex].childrens[childIndex].valueItem[
        valueItemIndex
      ].tags.filter((el) => Number(el.tagId) !== Number(action.payload.tagId));

      localStorage.setItem("links", JSON.stringify(state.links));
    },
    filterTags(state, action) {
      if (!action.payload.value) {
        state.isFilteringLinks = false;
        state.filterLinks = [];
        return;
      }
      state.filterLinks = [...JSON.parse(JSON.stringify(state.links))];
      state.isFilteringLinks = true;

      const parentIndex = state.filterLinks.findIndex(
        (el) => Number(el.parentId) === Number(action.payload.parentId)
      );

      const filterLinksFunc = (searchText, list) => {
        if (!searchText) {
          return list;
        }
        return list.filter(({ valueItem }) =>
          valueItem.some(({ tags }) =>
            tags.some(({ tagName }) => tagName.includes(searchText))
          )
        );
      };

      const filterChildrenArr = filterLinksFunc(
        action.payload.value,
        state.filterLinks[parentIndex].childrens
      );

      state.filterLinks[parentIndex].childrens = [...filterChildrenArr];
    },
    deletefilter(state) {
      state.isFilteringLinks = false;
      state.filterLinks = [];
    },
  },
});

export const {
  setLinks,
  createParent,
  createChild,
  onDeleteParent,
  onDeleteChild,
  changeChildElements,
  addNewRow,
  deleteRow,
  deleteRowTags,
  changeParentSummary,
  changeChildSummary,
  filterTags,
  deletefilter,
} = todoSlice.actions;

export default todoSlice.reducer;
