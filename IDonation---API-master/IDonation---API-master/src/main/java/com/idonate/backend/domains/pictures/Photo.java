package com.idonate.backend.domains.pictures;

import org.bson.types.Binary;

public class Photo {

	private String title;
	private Binary image;

	public Photo() {
	}

	public Photo(String title) {
		this.title = title;
	}

	public Photo(Binary image) {
		this.image = image;
	}

	public Binary getImage() {
		return image;
	}

	public void setImage(Binary image) {
		this.image = image;
	}

}
