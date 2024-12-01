import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

@Component({
  selector: 'app-character-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-editor.component.html',
  styleUrls: ['./character-editor.component.css']
})
export class CharacterEditorComponent {
  @Input() character: Character | null = null;
  @Output() closeEditor = new EventEmitter<void>();
  @Output() saveCharacter = new EventEmitter<Character>();

  editedCharacter: Character = {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: { name: '', url: '' },
    location: { name: '', url: '' },
    image: '',
    episode: [],
    url: '',
    created: ''
  };

  ngOnChanges() {
    if (this.character) {
      this.editedCharacter = { ...this.character };
    }
  }

  saveChanges() {
    this.saveCharacter.emit(this.editedCharacter);
  }

  close() {
    this.closeEditor.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}