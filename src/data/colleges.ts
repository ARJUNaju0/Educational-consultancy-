import type { College, CollegeLocation } from "@/types";

// IMPORTANT: Everything below is SAMPLE DATA.
// Replace it with verified college details supplied by the agency,
// then remove `isSample: true` from each entry.
export const colleges: College[] = [
  {
    id: "sample-1",
    name: "Sample College One",
    location: "Bengaluru",
    courseIds: ["engineering", "computer-applications"],
    description: "Sample description. Replace with verified details from the agency.",
    featured: true,
    isSample: true,
  },
  {
    id: "sample-2",
    name: "Sample College Two",
    location: "Mysuru",
    courseIds: ["management", "commerce"],
    description: "Sample description. Replace with verified details from the agency.",
    featured: true,
    isSample: true,
  },
  {
    id: "sample-3",
    name: "Sample College Three",
    location: "Mangaluru",
    courseIds: ["medical", "arts-science"],
    description: "Sample description. Replace with verified details from the agency.",
    featured: true,
    isSample: true,
  },
  {
    id: "sample-4",
    name: "Sample College Four",
    location: "Tamil Nadu",
    courseIds: ["engineering", "management"],
    description: "Sample description. Replace with verified details from the agency.",
    isSample: true,
  },
  {
    id: "sample-5",
    name: "Sample College Five",
    location: "Bengaluru",
    courseIds: ["commerce", "arts-science"],
    isSample: true,
  },
  {
    id: "sample-6",
    name: "Sample College Six",
    location: "Other",
    courseIds: ["other-professional"],
    isSample: true,
  },
];

export const collegeLocations: CollegeLocation[] = [
  "Bengaluru",
  "Mysuru",
  "Mangaluru",
  "Tamil Nadu",
  "Other",
];

// Short codes shown on the departure-board style college list
export const locationCodes: Record<CollegeLocation, string> = {
  Bengaluru: "BLR",
  Mysuru: "MYQ",
  Mangaluru: "IXE",
  "Tamil Nadu": "TN",
  Other: "OTH",
};
