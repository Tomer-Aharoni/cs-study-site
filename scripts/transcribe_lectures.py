import os
import subprocess
import sys
import ssl

def install_whisper():
    print("Checking/Installing OpenAI Whisper...")
    subprocess.check_call([
        sys.executable, "-m", "pip", "install", "-U", "openai-whisper", "torch",
        "--trusted-host", "pypi.org", "--trusted-host", "files.pythonhosted.org"
    ])

def main():
    # Dependencies already handled externally

    
    # Inject winget ffmpeg path into environment so whisper can find it without shell restart
    local_app_data = os.environ.get('LOCALAPPDATA', '')
    ffmpeg_path = os.path.join(local_app_data, 'Microsoft', 'WinGet', 'Packages', 'Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe', 'ffmpeg-9.0.2-full_build', 'bin')
    if os.path.exists(ffmpeg_path):
        os.environ['PATH'] = ffmpeg_path + os.pathsep + os.environ.get('PATH', '')

    import whisper

    # Bypass SSL errors for model downloading
    ssl._create_default_https_context = ssl._create_unverified_context

    print("\nLoading Whisper model 'turbo' (optimized for speed and multi-language)...")
    try:
        model = whisper.load_model("turbo")
    except Exception:
        print("Falling back to 'small' model...")
        model = whisper.load_model("small")

    target_dir = os.path.join(os.path.dirname(__file__), '..', 'irena_lectures_mp3')
    
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    print(f"\nScanning for audio/video files in: {target_dir}")
    valid_extensions = {".mp3", ".m4a", ".mp4", ".wav", ".ogg", ".aac"}
    files_to_transcribe = []

    for f in os.listdir(target_dir):
        ext = os.path.splitext(f)[1].lower()
        if ext in valid_extensions:
            files_to_transcribe.append(os.path.join(target_dir, f))

    if not files_to_transcribe:
        print("No media files found! Please make sure your recordings are in 'irena_lectures_mp3' and run again.")
        return

    for file_path in files_to_transcribe:
        txt_path = file_path + ".txt"
        if os.path.exists(txt_path):
            print(f"Skipping {os.path.basename(file_path)} (already transcribed).")
            continue
            
        print(f"\nTranscribing: {os.path.basename(file_path)} ... (This may take a while depending on your CPU/GPU)")
        # For Hebrew audio
        result = model.transcribe(file_path, language="he")
        
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(result["text"])
        print(f"[SUCCESS] Saved transcript to: {txt_path}")

    print("\nAll done! The agents can now read the text files.")

if __name__ == "__main__":
    main()
