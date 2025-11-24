import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ApiClientService } from '../../core/services/api-client.service';
import { Message } from '../../models/message.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzSpinModule,
    NzAvatarModule,
    NzIconModule,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer?: ElementRef<HTMLDivElement>;
  inputValue = '';
  messages: Message[] = [];
  loading = false;
  quickPrompts: string[] = [
    'Give me a viral landing page concept for a dev tool',
    'Explain this Angular bug like I am on TikTok live',
    'Rewrite this API call to be ultra-performant',
    'Brainstorm edgy onboarding microcopy for Gen Z',
  ];

  constructor(
    private api: ApiClientService,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  private typingInterval: any;
  private storageKey = 'chat_history';

  ngOnInit(): void {
    this.loadMessages();
  }

  ngOnDestroy(): void {
    this.stopTyping();
  }

  sendMessage(): void {
    if (!this.inputValue.trim() || this.loading) return;

    const userMsg = this.inputValue;
    this.messages.push({ content: userMsg, sender: 'user', timestamp: new Date() });
    this.flushAndScroll();
    this.persistMessages();
    this.inputValue = '';
    this.loading = true;

    this.api.chat(userMsg).subscribe({
      next: (res) => {
        this.playTyping(res.reply, new Date(res.createdAt));
      },
      error: () => {
        this.loading = false;
        this.msg.error('Failed to get response from Gemini.');
      },
    });
  }

  clearChat(): void {
    this.messages = [];
    this.inputValue = '';
    this.flushAndScroll();
    this.persistMessages();
  }

  usePrompt(prompt: string): void {
    this.inputValue = prompt;
    this.sendMessage();
  }

  handleKeyDown(event: KeyboardEvent): void {
    const isCmdEnter = (event.metaKey || event.ctrlKey) && event.key === 'Enter';
    if ((event.key === 'Enter' && !event.shiftKey) || isCmdEnter) {
      event.preventDefault();
      this.sendMessage();
    } else if (event.key === 'Escape') {
      this.inputValue = '';
      if (this.loading) {
        this.stopTyping();
        this.loading = false;
      }
    }
  }

  formatMessage(content: string): SafeHtml {
    const withBold = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    const lines = withBold.split(/\r?\n/);
    let html = '';
    let inList = false;

    lines.forEach((line) => {
      const bulletMatch = line.match(/^\s*\*\s+(.*)/);
      if (bulletMatch) {
        if (!inList) {
          html += '<ul class="message-list">';
          inList = true;
        }
        html += `<li>${bulletMatch[1]}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        const trimmed = line.trim();
        if (trimmed) {
          html += `<p>${trimmed}</p>`;
        }
      }
    });

    if (inList) {
      html += '</ul>';
    }

    return this.sanitizer.bypassSecurityTrustHtml(html || `<p>${content}</p>`);
  }

  private flushAndScroll(): void {
    this.cdr.detectChanges();
    setTimeout(() => {
      const el = this.scrollContainer?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 0);
  }

  private playTyping(fullText: string, timestamp: Date): void {
    this.stopTyping();
    const aiMessage: Message = { content: '', sender: 'ai', timestamp };
    this.messages.push(aiMessage);
    const words = fullText.split(' ');
    let index = 0;
    const step = () => {
      if (index < words.length) {
        aiMessage.content = words.slice(0, index + 1).join(' ');
        index++;
        this.persistMessages();
        this.flushAndScroll();
      } else {
        this.stopTyping();
        this.loading = false;
      }
    };
    this.typingInterval = setInterval(step, 60);
  }

  private stopTyping(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
  }

  private persistMessages(): void {
    const serializable = this.messages.map((m) => ({
      ...m,
      timestamp: m.timestamp.toISOString(),
    }));
    localStorage.setItem(this.storageKey, JSON.stringify(serializable));
  }

  private loadMessages(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Message[];
        this.messages = parsed.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        this.flushAndScroll();
      } catch {
        this.messages = [];
      }
    }
  }
}
