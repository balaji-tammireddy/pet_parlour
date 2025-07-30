export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-6 text-center text-muted-foreground text-sm">
      © {new Date().getFullYear()} The Pet Parlour. All rights reserved.
    </footer>
  );
}
