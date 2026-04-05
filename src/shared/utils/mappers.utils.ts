import { type UserDef, type UserDto } from "@/domains/auth";
import { LatLngType } from "../interfaces/forms/address-autocomplete.interfaces";
import {
  PropertyPreviewDef,
  PropertyPreviewDto,
  PropertyTypeDef,
  PropertyTypeDto,
} from "../interfaces/property/property.interfaces";

export function getLatLngFromPolyline(
  polyline: google.maps.Polyline
): LatLngType[] {
  const latLng: LatLngType[] = [];
  const paths = polyline.getPath();
  paths.forEach(({ lat, lng }) => latLng.push({ lat: lat(), lng: lng() }));
  return latLng;
}

export function getMapCornersFromBounds(bounds: google.maps.LatLngBounds) {
  const northEast = bounds.getNorthEast();
  const southWest = bounds.getSouthWest();

  const northWest = new google.maps.LatLng(northEast.lat(), southWest.lng());
  const southEast = new google.maps.LatLng(southWest.lat(), northEast.lng());

  return {
    northeast: northEast.toJSON(),
    northwest: northWest.toJSON(),
    southwest: southWest.toJSON(),
    southeast: southEast.toJSON()
  };
}

export function mapPropertyDtoToDef(
  property: PropertyTypeDto
): PropertyTypeDef {
  return {
    id: property.id!,
    relationType: property.relationType,
    price: property.price,
    description: property.description,
    expensesMonthly: property.expensesMonthly,
    contactPreference: property.contactPreference,
    details: {
      propertyType: property.details.propertyType,
      conditions: property.details.conditions,
      address: property.details.address,
      isLastFloor: property.details.isLastFloor,
      surface: property.details.surface,
      roomNumber: property.details.roomNumber,
      bathroomNumber: property.details.bathroomNumber,
      hasElevator: property.details.hasElevator,
      furniture: property.details.furniture,
      commodities: {
        hasAirConditioning: property.details.commodities.hasAirConditioning,
        hasClosetInTheWall: property.details.commodities.hasClosetInTheWall,
        hasBalcony: property.details.commodities.hasBalcony,
        hasCellar: property.details.commodities.hasCellar,
        hasParking: property.details.commodities.hasParking,
        hasTerrace: property.details.commodities.hasTerrace
      },
      residentialComplex: property.details.address.residenceComplex
    },
    contractDetails: {
      ...property.contractDetails,
      rentInAdvance: property.contractDetails.rentInAdvance.toString()
    },
    user: property.user,
    photos: property.photos,
    isFavorite: !!property.isFavorite,
    status: property.status,
    views: property.views,
    createdAt: property.createdAt,
    updatedAt: property.updatedAt
  };
}

export function mapPropertyPreviewDtoToDef(
  data: PropertyPreviewDto
): PropertyPreviewDef {
  return {
    id: data.id,
    contact: {
      contactPreference: data.contactPreference,
      phoneNumber: "" // TODO map this value when BE is ready
    },
    isFavorite: data.isFavorite,
    ownerId: data.ownerId,
    photos: data.photos,
    price: data.price,
    details: data.details,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
}

export function mapUserDtoToDef(user: UserDto): UserDef {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    picture: user.picture,
    role: user.authority,
    createdAt: user.createdAt
  };
}
