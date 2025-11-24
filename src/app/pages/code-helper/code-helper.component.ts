import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ApiClientService } from '../../core/services/api-client.service';
import { CodeHelperResponse } from '../../models/api-responses.model';

@Component({
  selector: 'app-code-helper',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSpinModule,
    NzGridModule,
    NzIconModule,
  ],
  templateUrl: './code-helper.component.html',
  styleUrls: ['./code-helper.component.css'],
})
export class CodeHelperComponent {
  code = '';
  context = '';
  loading = false;
  result: CodeHelperResponse | null = null;
  presets: string[] = [
    'Make this React component lighter and faster',
    'Rewrite for readability with clear naming',
    'Harden security and validate every input',
    'Refactor to modern Angular best practices',
  ];

  constructor(private api: ApiClientService, private msg: NzMessageService) {}

  getSuggestions(): void {
    if (!this.code.trim()) return;

    this.loading = true;
    this.result = null;

    this.api.codeHelper(this.code, this.context).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        this.msg.error('Failed to get suggestions from Gemini.');
        this.loading = false;
      },
    });
  }

  applyPreset(preset: string): void {
    this.context = preset;
  }

  reset(): void {
    this.code = '';
    this.context = '';
    this.result = null;
  }
}
