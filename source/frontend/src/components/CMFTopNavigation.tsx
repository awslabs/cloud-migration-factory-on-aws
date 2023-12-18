import React from "react";
import {TopNavigation} from "@awsui/components-react";
import {TopNavigationProps} from "@awsui/components-react/top-navigation/interfaces";

const CustomTopNavigation = TopNavigation as any; // casting to `any` to allow to pass id and style properties

interface CMFTopNavigationProps {
  utilities: ReadonlyArray<TopNavigationProps.Utility>
}

export const CMFTopNavigation = ({utilities}: CMFTopNavigationProps) => {
  return <CustomTopNavigation
    id='h' style={myHeaderStyle}
    identity={identity}
    utilities={utilities}
    i18nStrings={i18nStrings}
  />
}

const identity = {
  href: "/",
  title: " ",
  logo: {
    src:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzA0IDE4MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzA0IDE4MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9DQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGRjk5MDA7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04Ni40LDY2LjRjMCwzLjcsMC40LDYuNywxLjEsOC45YzAuOCwyLjIsMS44LDQuNiwzLjIsNy4yYzAuNSwwLjgsMC43LDEuNiwwLjcsMi4zYzAsMS0wLjYsMi0xLjksM2wtNi4zLDQuMg0KCQljLTAuOSwwLjYtMS44LDAuOS0yLjYsMC45Yy0xLDAtMi0wLjUtMy0xLjRDNzYuMiw5MCw3NSw4OC40LDc0LDg2LjhjLTEtMS43LTItMy42LTMuMS01LjljLTcuOCw5LjItMTcuNiwxMy44LTI5LjQsMTMuOA0KCQljLTguNCwwLTE1LjEtMi40LTIwLTcuMmMtNC45LTQuOC03LjQtMTEuMi03LjQtMTkuMmMwLTguNSwzLTE1LjQsOS4xLTIwLjZjNi4xLTUuMiwxNC4yLTcuOCwyNC41LTcuOGMzLjQsMCw2LjksMC4zLDEwLjYsMC44DQoJCWMzLjcsMC41LDcuNSwxLjMsMTEuNSwyLjJ2LTcuM2MwLTcuNi0xLjYtMTIuOS00LjctMTZjLTMuMi0zLjEtOC42LTQuNi0xNi4zLTQuNmMtMy41LDAtNy4xLDAuNC0xMC44LDEuM2MtMy43LDAuOS03LjMsMi0xMC44LDMuNA0KCQljLTEuNiwwLjctMi44LDEuMS0zLjUsMS4zYy0wLjcsMC4yLTEuMiwwLjMtMS42LDAuM2MtMS40LDAtMi4xLTEtMi4xLTMuMXYtNC45YzAtMS42LDAuMi0yLjgsMC43LTMuNWMwLjUtMC43LDEuNC0xLjQsMi44LTIuMQ0KCQljMy41LTEuOCw3LjctMy4zLDEyLjYtNC41YzQuOS0xLjMsMTAuMS0xLjksMTUuNi0xLjljMTEuOSwwLDIwLjYsMi43LDI2LjIsOC4xYzUuNSw1LjQsOC4zLDEzLjYsOC4zLDI0LjZWNjYuNHogTTQ1LjgsODEuNg0KCQljMy4zLDAsNi43LTAuNiwxMC4zLTEuOGMzLjYtMS4yLDYuOC0zLjQsOS41LTYuNGMxLjYtMS45LDIuOC00LDMuNC02LjRjMC42LTIuNCwxLTUuMywxLTguN3YtNC4yYy0yLjktMC43LTYtMS4zLTkuMi0xLjcNCgkJYy0zLjItMC40LTYuMy0wLjYtOS40LTAuNmMtNi43LDAtMTEuNiwxLjMtMTQuOSw0Yy0zLjMsMi43LTQuOSw2LjUtNC45LDExLjVjMCw0LjcsMS4yLDguMiwzLjcsMTAuNg0KCQlDMzcuNyw4MC40LDQxLjIsODEuNiw0NS44LDgxLjZ6IE0xMjYuMSw5Mi40Yy0xLjgsMC0zLTAuMy0zLjgtMWMtMC44LTAuNi0xLjUtMi0yLjEtMy45TDk2LjcsMTAuMmMtMC42LTItMC45LTMuMy0wLjktNA0KCQljMC0xLjYsMC44LTIuNSwyLjQtMi41aDkuOGMxLjksMCwzLjIsMC4zLDMuOSwxYzAuOCwwLjYsMS40LDIsMiwzLjlsMTYuOCw2Ni4ybDE1LjYtNjYuMmMwLjUtMiwxLjEtMy4zLDEuOS0zLjljMC44LTAuNiwyLjItMSw0LTENCgkJaDhjMS45LDAsMy4yLDAuMyw0LDFjMC44LDAuNiwxLjUsMiwxLjksMy45bDE1LjgsNjdsMTcuMy02N2MwLjYtMiwxLjMtMy4zLDItMy45YzAuOC0wLjYsMi4xLTEsMy45LTFoOS4zYzEuNiwwLDIuNSwwLjgsMi41LDIuNQ0KCQljMCwwLjUtMC4xLDEtMC4yLDEuNmMtMC4xLDAuNi0wLjMsMS40LTAuNywyLjVsLTI0LjEsNzcuM2MtMC42LDItMS4zLDMuMy0yLjEsMy45Yy0wLjgsMC42LTIuMSwxLTMuOCwxaC04LjZjLTEuOSwwLTMuMi0wLjMtNC0xDQoJCWMtMC44LTAuNy0xLjUtMi0xLjktNEwxNTYsMjNsLTE1LjQsNjQuNGMtMC41LDItMS4xLDMuMy0xLjksNGMtMC44LDAuNy0yLjIsMS00LDFIMTI2LjF6IE0yNTQuNiw5NS4xYy01LjIsMC0xMC40LTAuNi0xNS40LTEuOA0KCQljLTUtMS4yLTguOS0yLjUtMTEuNS00Yy0xLjYtMC45LTIuNy0xLjktMy4xLTIuOGMtMC40LTAuOS0wLjYtMS45LTAuNi0yLjh2LTUuMWMwLTIuMSwwLjgtMy4xLDIuMy0zLjFjMC42LDAsMS4yLDAuMSwxLjgsMC4zDQoJCWMwLjYsMC4yLDEuNSwwLjYsMi41LDFjMy40LDEuNSw3LjEsMi43LDExLDMuNWM0LDAuOCw3LjksMS4yLDExLjksMS4yYzYuMywwLDExLjItMS4xLDE0LjYtMy4zYzMuNC0yLjIsNS4yLTUuNCw1LjItOS41DQoJCWMwLTIuOC0wLjktNS4xLTIuNy03Yy0xLjgtMS45LTUuMi0zLjYtMTAuMS01LjJMMjQ2LDUyYy03LjMtMi4zLTEyLjctNS43LTE2LTEwLjJjLTMuMy00LjQtNS05LjMtNS0xNC41YzAtNC4yLDAuOS03LjksMi43LTExLjENCgkJYzEuOC0zLjIsNC4yLTYsNy4yLTguMmMzLTIuMyw2LjQtNCwxMC40LTUuMmM0LTEuMiw4LjItMS43LDEyLjYtMS43YzIuMiwwLDQuNSwwLjEsNi43LDAuNGMyLjMsMC4zLDQuNCwwLjcsNi41LDEuMQ0KCQljMiwwLjUsMy45LDEsNS43LDEuNmMxLjgsMC42LDMuMiwxLjIsNC4yLDEuOGMxLjQsMC44LDIuNCwxLjYsMywyLjVjMC42LDAuOCwwLjksMS45LDAuOSwzLjN2NC43YzAsMi4xLTAuOCwzLjItMi4zLDMuMg0KCQljLTAuOCwwLTIuMS0wLjQtMy44LTEuMmMtNS43LTIuNi0xMi4xLTMuOS0xOS4yLTMuOWMtNS43LDAtMTAuMiwwLjktMTMuMywyLjhjLTMuMSwxLjktNC43LDQuOC00LjcsOC45YzAsMi44LDEsNS4yLDMsNy4xDQoJCWMyLDEuOSw1LjcsMy44LDExLDUuNWwxNC4yLDQuNWM3LjIsMi4zLDEyLjQsNS41LDE1LjUsOS42YzMuMSw0LjEsNC42LDguOCw0LjYsMTRjMCw0LjMtMC45LDguMi0yLjYsMTEuNg0KCQljLTEuOCwzLjQtNC4yLDYuNC03LjMsOC44Yy0zLjEsMi41LTYuOCw0LjMtMTEuMSw1LjZDMjY0LjQsOTQuNCwyNTkuNyw5NS4xLDI1NC42LDk1LjF6Ii8+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNzMuNSwxNDMuN2MtMzIuOSwyNC4zLTgwLjcsMzcuMi0xMjEuOCwzNy4yYy01Ny42LDAtMTA5LjUtMjEuMy0xNDguNy01Ni43Yy0zLjEtMi44LTAuMy02LjYsMy40LTQuNA0KCQkJYzQyLjQsMjQuNiw5NC43LDM5LjUsMTQ4LjgsMzkuNWMzNi41LDAsNzYuNi03LjYsMTEzLjUtMjMuMkMyNzQuMiwxMzMuNiwyNzguOSwxMzkuNywyNzMuNSwxNDMuN3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI4Ny4yLDEyOC4xYy00LjItNS40LTI3LjgtMi42LTM4LjUtMS4zYy0zLjIsMC40LTMuNy0yLjQtMC44LTQuNWMxOC44LTEzLjIsNDkuNy05LjQsNTMuMy01DQoJCQljMy42LDQuNS0xLDM1LjQtMTguNiw1MC4yYy0yLjcsMi4zLTUuMywxLjEtNC4xLTEuOUMyODIuNSwxNTUuNywyOTEuNCwxMzMuNCwyODcuMiwxMjguMXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==",
    alt: "AWS"
  }
};

const i18nStrings = {
  searchIconAriaLabel: "Search",
  searchDismissIconAriaLabel: "Close search",
  overflowMenuTriggerText: "More"
};

const myHeaderStyle = {
  postion: 'sticky',
  'z-index': 1999
}